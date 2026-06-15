"use client";

import Image from "next/image";
import { useState } from "react";

import { Sighting } from "@/types/sighting";

import { PROVINCES } from "@/constants/provinces";

import { useRouter }
from "next/navigation";

import {
  updateSighting,
} from "@/services/sighting.service";

import {
  uploadSightingImage,
} from "@/services/storage.service";

import SpeciesCombobox
from "@/components/sighting/SpeciesCombobox";

interface Props {
  sighting: Sighting;
}

export default function EditSightingForm({
  sighting,
}: Props) {

    const router = useRouter();

    const [saving, setSaving] =
    useState(false);

    const [image, setImage] =
    useState<File | null>(null);

    const [preview, setPreview] =
    useState(
        sighting.foto_url ?? ""
    );

    const [selectedSpecies,
    setSelectedSpecies] =
    useState({
        id:
        sighting.spesies_id ?? "",

        species:
        sighting.nama_ilmiah ?? "",

        nama_lokal:
        sighting.nama_lokal ?? null,
    });

  const [form, setForm] =
    useState({
      tipe_organisme:
        sighting.tipe_organisme,

      nama_lokasi:
        sighting.nama_lokasi,

      provinsi:
        sighting.provinsi,

      latitude:
        sighting.latitude.toString(),

      longitude:
        sighting.longitude.toString(),

      habitat:
        sighting.habitat,

      substrat:
        sighting.substrat,

      tanggal_temuan:
        sighting.tanggal_temuan,

      deskripsi:
        sighting.deskripsi ?? "",
    });

  function handleChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  }

  async function handleSubmit() {
    try {
        if (!selectedSpecies.id) {

        alert(
            "Pilih spesies terlebih dahulu"
        );

        return;
        }

        setSaving(true);

        let imageUrl =
            sighting.foto_url;

            if (image) {

            const uploaded =
                await uploadSightingImage(
                image
                );

            if (!uploaded) {

                alert(
                "Upload foto gagal"
                );

                return;
            }

            imageUrl = uploaded;
            }

            const updatedNamaLokal =
                selectedSpecies.nama_lokal
                ? selectedSpecies.nama_lokal.trim() || null
                : null;

            const updatedNamaIlmiah =
                selectedSpecies.species
                ? selectedSpecies.species.trim() || null
                : null;

            await updateSighting(
        sighting.id,
        {
            tipe_organisme:
            form.tipe_organisme,

            spesies_id:
            selectedSpecies.id || null,

            nama_lokal:
            updatedNamaLokal,

            nama_ilmiah:
            updatedNamaIlmiah,

            nama_lokasi:
            form.nama_lokasi,

            provinsi:
            form.provinsi,

            latitude:
            Number(
                form.latitude
            ),

            longitude:
            Number(
                form.longitude
            ),

            habitat:
            form.habitat,

            substrat:
            form.substrat,

            tanggal_temuan:
            form.tanggal_temuan,

            deskripsi:
            form.deskripsi,

            foto_url:
            imageUrl,

            status:
            "menunggu",
        }
        );

        alert(
        "Sighting berhasil diperbarui"
        );

        router.push(
        `/dashboard/sighting/${sighting.id}`
        );

        router.refresh();

    } catch (error) {

        console.error(error);

        alert(
        "Gagal memperbarui sighting"
        );

    } finally {

        setSaving(false);

    }
    }

  return (
    <form className="space-y-6">
    {/* organisme */}

    {/* Organisme */}
    <div>
    <label className="block mb-2">
        Jenis Organisme
        <span className="text-red-500">
        *
        </span>
    </label>

    <select
        name="tipe_organisme"
        value={form.tipe_organisme}
        onChange={handleChange}
        className="w-full bg-black border border-yellow-500/20 rounded-lg p-3"
    >
        <option value="">
        Pilih Organisme
        </option>

        <option value="ikan">
        Ikan
        </option>

        <option value="tumbuhan">
        Tumbuhan
        </option>

        <option value="udang">
        Udang
        </option>

        <option value="reptil">
        Reptil
        </option>
    </select>
    </div>

    <div>

        <label className="block mb-2">
            Spesies
        </label>

        <SpeciesCombobox
            onSelect={(species) => {
            setSelectedSpecies(
                species
            );
            }}
        />

        <div
            className="mt-3 text-sm text-gray-400"
        >
            Spesies saat ini:
            {" "}
            {selectedSpecies.nama_lokal}
            {" "}
            (
            {selectedSpecies.species}
            )
        </div>

        </div>
      {/* Lokasi */}
      <div>
        <label className="block mb-2">
          Nama Lokasi
        </label>

        <input
          name="nama_lokasi"
          value={form.nama_lokasi}
          onChange={handleChange}
          className="w-full bg-black border border-yellow-500/20 rounded-lg p-3"
        />
      </div>

      {/* Provinsi */}
      <div>
        <label className="block mb-2">
          Provinsi
        </label>

        <select
          name="provinsi"
          value={form.provinsi}
          onChange={handleChange}
          className="w-full bg-black border border-yellow-500/20 rounded-lg p-3"
        >
          <option value="">
            Pilih Provinsi
          </option>

          {PROVINCES.map((province) => (
            <option
              key={province}
              value={province}
            >
              {province}
            </option>
          ))}
        </select>
      </div>

      {/* Koordinat */}
      <div className="grid md:grid-cols-2 gap-4">

        <div>
          <label className="block mb-2">
            Latitude
          </label>

          <input
            type="number"
            step="any"
            name="latitude"
            value={form.latitude}
            onChange={handleChange}
            className="w-full bg-black border border-yellow-500/20 rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2">
            Longitude
          </label>

          <input
            type="number"
            step="any"
            name="longitude"
            value={form.longitude}
            onChange={handleChange}
            className="w-full bg-black border border-yellow-500/20 rounded-lg p-3"
          />
        </div>

      </div>

      {/* Habitat */}
      <div>
        <label className="block mb-2">
          Habitat
        </label>

        <select
          name="habitat"
          value={form.habitat}
          onChange={handleChange}
          className="w-full bg-black border border-yellow-500/20 rounded-lg p-3"
        >
          <option value="">
            Pilih Habitat
          </option>

          <option value="sungai">
            Sungai
          </option>
          <option value="danau">
            Danau
          </option>
          <option value="rawa">
            Rawa
          </option>
          <option value="parit">
            Parit
          </option>
        </select>
      </div>

      {/* Substrat */}
      <div>
        <label className="block mb-2">
          Substrat
        </label>

        <select
          name="substrat"
          value={form.substrat}
          onChange={handleChange}
          className="w-full bg-black border border-yellow-500/20 rounded-lg p-3"
        >
          <option value="">
            Pilih Substrat
          </option>

          <option value="pasir">
            Pasir
          </option>
          <option value="batu">
            Batu
          </option>
          <option value="lumpur">
            Lumpur
          </option>
          <option value="gambut">
            Gambut
          </option>
          <option value="liat">
            Liat
          </option>
        </select>
      </div>

      {/* Tanggal */}
      <div>
        <label className="block mb-2">
          Tanggal Temuan
        </label>

        <input
          type="date"
          name="tanggal_temuan"
          value={form.tanggal_temuan}
          onChange={handleChange}
          className="w-full bg-black border border-yellow-500/20 rounded-lg p-3"
        />
      </div>

      {/* Deskripsi */}
      <div>
        <label className="block mb-2">
          Deskripsi
        </label>

        <textarea
          rows={5}
          name="deskripsi"
          value={form.deskripsi}
          onChange={handleChange}
          className="w-full bg-black border border-yellow-500/20 rounded-lg p-3"
        />
      </div>

      <div>

        <label className="block mb-2">
            Foto Sighting
        </label>

        <div className="border border-yellow-500/20 rounded-2xl p-4 space-y-4">
          {preview ? (
            <div className="relative w-full min-h-80 rounded-xl overflow-hidden border border-yellow-500/20 bg-black">
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-contain"
                unoptimized
              />

              <label className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/80 px-4 py-2 text-sm font-medium text-white border border-yellow-500/30 cursor-pointer hover:bg-black">
                Ganti Foto
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    setImage(file);
                    setPreview(URL.createObjectURL(file));
                  }}
                  className="hidden"
                />
              </label>
            </div>
          ) : (
            <label className="block w-full border border-dashed border-yellow-500/40 rounded-xl p-10 text-center cursor-pointer hover:border-yellow-400 transition">
              <p className="text-white font-medium">
                Upload Foto Sighting
              </p>

              <p className="text-gray-400 text-sm mt-1">
                JPG, PNG maksimal 5 MB
              </p>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  setImage(file);
                  setPreview(URL.createObjectURL(file));
                }}
                className="hidden"
              />
            </label>
          )}
        </div>

        </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={saving}
        className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold disabled:opacity-50"
        >
        {saving
            ? "Menyimpan..."
            : "Perbarui Sighting"}
        </button>

    </form>
  );
}