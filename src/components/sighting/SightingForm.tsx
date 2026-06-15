"use client";

import Image from "next/image";
import { useState, type ChangeEvent } from "react";
import SpeciesCombobox from "./SpeciesCombobox";
import { PROVINCES } from "@/constants/provinces";
import { uploadSightingImage } from "@/services/storage.service";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { createSighting } from "@/services/sighting.service";
import { Sighting }
from "@/types/sighting";
import {
  updateSighting,
} from "@/services/sighting.service";




interface Props {
  isAdmin?: boolean;

  initialData?: Sighting;
}

export default function SightingForm({
    isAdmin = false,
    initialData,
  }: Props) {
    
  const [image, setImage] =
  useState<File | null>(null);

  const [preview, setPreview] =
  useState<string | null>(
    initialData?.foto_url ?? null
  );


  const [uploading, setUploading] =
  useState(false);

  const router = useRouter();

  const [form, setForm] =
    useState({

      tipe_organisme:
        initialData?.tipe_organisme ?? "",

      spesies_id:
        initialData?.spesies_id ?? "",

      nama_lokasi:
        initialData?.nama_lokasi ?? "",

      provinsi:
        initialData?.provinsi ?? "",

      latitude:
        initialData?.latitude
          ?.toString() ?? "",

      longitude:
        initialData?.longitude
          ?.toString() ?? "",

      habitat:
        initialData?.habitat ?? "",

      substrat:
        initialData?.substrat ?? "",

      tanggal_temuan:
        initialData?.tanggal_temuan ?? "",

      deskripsi:
        initialData?.deskripsi ?? "",
    });

  const [isNewSpecies,
  setIsNewSpecies] =
  useState(false);

  const [selectedSpecies,
  setSelectedSpecies] =
  useState<{
    id: string;
    species: string;
    nama_lokal: string | null;
  } | null>(null);

  const [newSpeciesData,
  setNewSpeciesData] =
  useState({
    nama_lokal: "",
    nama_ilmiah: "",
  });

  function handleChange(
    e: ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleNewSpeciesChange(
    e: ChangeEvent<HTMLInputElement>
  ) {
    setNewSpeciesData({
      ...newSpeciesData,
      [e.target.name]: e.target.value,
    });
  }

  function handleClearSpeciesSelection() {
    setSelectedSpecies(null);
    setIsNewSpecies(false);
    setNewSpeciesData({
      nama_lokal: "",
      nama_ilmiah: "",
    });
    setForm((prev) => ({
      ...prev,
      spesies_id: "",
    }));
  }

  function handleImageChange(
      e: React.ChangeEvent<HTMLInputElement>
    ) {
      const file = e.target.files?.[0];

      if (!file) return;

      if (file.size > 5 * 1024 * 1024) {
        alert("Ukuran foto maksimal 5 MB");
        return;
      }

      if (
        !file.type.includes("image")
      ) {
        alert("File harus berupa gambar");
        return;
      }

      setImage(file);

      setPreview(
        URL.createObjectURL(file)
      );
    }

  function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setForm((prev) => ({
          ...prev,
          latitude:
            position.coords.latitude.toString(),
          longitude:
            position.coords.longitude.toString(),
        }));
      },
      () => {
        alert(
          "Akses lokasi ditolak"
        );
      }
    );
  }

  function validateForm() {
    if (!form.tipe_organisme) {
      alert(
        "Jenis organisme wajib diisi"
      );
      return false;
    }

    if (
      !form.spesies_id &&
      !selectedSpecies?.species
    ) {
      alert(
        "Pilih spesies atau tambahkan spesies baru"
      );
      return false;
    }

    if (isNewSpecies) {
      if (!newSpeciesData.nama_lokal.trim()) {
        alert(
          "Nama lokal untuk spesies baru wajib diisi"
        );
        return false;
      }

      if (!newSpeciesData.nama_ilmiah.trim()) {
        alert(
          "Nama ilmiah untuk spesies baru wajib diisi"
        );
        return false;
      }
    }

    if (!form.nama_lokasi) {
      alert(
        "Nama lokasi wajib diisi"
      );
      return false;
    }

    if (!form.provinsi) {
      alert(
        "Provinsi wajib dipilih"
      );
      return false;
    }

    if (!form.latitude) {
      alert(
        "Latitude wajib diisi"
      );
      return false;
    }

    if (!form.longitude) {
      alert(
        "Longitude wajib diisi"
      );
      return false;
    }

    if (!form.habitat) {
      alert(
        "Habitat wajib dipilih"
      );
      return false;
    }

    if (!form.substrat) {
      alert(
        "Substrat wajib dipilih"
      );
      return false;
    }

    if (!form.tanggal_temuan) {
      alert(
        "Tanggal temuan wajib diisi"
      );
      return false;
    }

    if (
  !image &&
    !initialData?.foto_url
  ) {
    alert(
      "Foto wajib diupload"
    );
    return false;
  }

    return true;
  }

  async function handleSubmit() {
    if (!validateForm()) {
      return;
    }

    try {
      setUploading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Silakan login terlebih dahulu");
        setUploading(false);
        return;
      }

      let imageUrl =
        initialData?.foto_url ?? "";

      if (image) {

        const uploadedUrl =
          await uploadSightingImage(
            image
          );

        if (!uploadedUrl) {

          alert(
            "Upload foto gagal"
          );

          return;
        }

        imageUrl =
          uploadedUrl;
      }

      const nama_lokal = isNewSpecies
        ? newSpeciesData.nama_lokal.trim()
        : selectedSpecies?.nama_lokal ?? null;

      const nama_ilmiah = isNewSpecies
        ? newSpeciesData.nama_ilmiah.trim()
        : selectedSpecies?.species ?? null;

      const sightingPayload = {
        spesies_id:
          isNewSpecies
            ? null
            : form.spesies_id || null,
        spesies_baru: isNewSpecies,
        nama_lokal: nama_lokal,
        nama_ilmiah: nama_ilmiah,
        tipe_organisme: form.tipe_organisme,
        deskripsi: form.deskripsi,
        foto_url: imageUrl,
        nama_lokasi: form.nama_lokasi,
        provinsi: form.provinsi,
        latitude: Number(form.latitude),
        longitude: Number(form.longitude),
        habitat: form.habitat,
        substrat: form.substrat,
        tanggal_temuan: form.tanggal_temuan,
        diunggah_oleh: user.id,

        status: isAdmin
        ? "disetujui"
        : "menunggu",
      };

      console.debug("createSighting payload:", sightingPayload);

      
      if (initialData) {

        await updateSighting(
          initialData.id,
          sightingPayload
        );

                alert(
          "Sighting berhasil diperbarui"
        );

        router.push(
          "/admin/sighting"
        );

        router.refresh();

      } else {

        await createSighting(
          sightingPayload
        );

        alert("Sighting berhasil dikirim");
  
        router.push(
          isAdmin
            ? "/admin/sighting"
            : "/dashboard/sighting"
        );
  
        router.refresh();
      } 


    } catch (error: unknown) {
      console.error("createSighting error:", error);

      const getErrorMessage = (value: unknown) => {
        if (value instanceof Error) {
          return value.message;
        }

        if (
          typeof value === "object" &&
          value !== null &&
          "message" in value
        ) {
          const err = value as { message?: unknown };

          if (typeof err.message === "string") {
            return err.message;
          }

          return JSON.stringify(err);
        }

        return String(value);
      };

      const message = getErrorMessage(error);

      alert(`Terjadi kesalahan saat menyimpan data. ${message}`);
    } finally {
      setUploading(false);
    }
  }

  return (
    <form className="space-y-6">

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

      {/* Species */}
      <div>
        <label className="block mb-2">
          Spesies <span className="text-red-500">*</span>
        </label>

        <SpeciesCombobox
          onSelect={(species) => {
          const newSpecies = species.id === "";

          setSelectedSpecies(species);

          setIsNewSpecies(newSpecies);

          setForm((prev) => ({
            ...prev,
            spesies_id:
              species.id,
          }));

          setNewSpeciesData(
            newSpecies
              ? {
                  nama_lokal: "",
                  nama_ilmiah:
                    species.species,
                }
              : {
                  nama_lokal: "",
                  nama_ilmiah: "",
                }
          );
        }}
          onClear={handleClearSpeciesSelection}
        />

        {isNewSpecies && (
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-2">
                Nama Lokal Spesies
                <span className="text-red-500">
                  *
                </span>
              </label>

              <input
                type="text"
                name="nama_lokal"
                value={newSpeciesData.nama_lokal}
                onChange={handleNewSpeciesChange}
                className="w-full bg-black border border-yellow-500/20 rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2">
                Nama Ilmiah Spesies
                <span className="text-red-500">
                  *
                </span>
              </label>

              <input
                type="text"
                name="nama_ilmiah"
                value={newSpeciesData.nama_ilmiah}
                onChange={handleNewSpeciesChange}
                className="w-full bg-black border border-yellow-500/20 rounded-lg p-3"
              />
            </div>
          </div>
        )}
      </div>

      {/* Lokasi */}
      <div>
        <label className="block mb-2">
          Nama Lokasi
          <span className="text-red-500">
            *
          </span> 
        </label>

        <input
          type="text"
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
          <span className="text-red-500">
            *
          </span>
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
      <button
        type="button"
        onClick={getCurrentLocation}
        className="mb-4 bg-yellow-400 text-black px-4 py-2 rounded-lg"
      >
        📍 Gunakan Lokasi Saya
      </button>
      <div className="grid grid-cols-2 gap-4">

        <div>
          <label className="block mb-2">
            Latitude
            <span className="text-red-500">
              *
            </span>
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
            <span className="text-red-500">
              *
            </span>
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
          <span className="text-red-500">
            *
          </span>
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
          <span className="text-red-500">
            *
          </span>
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
          <span className="text-red-500">
            *
          </span>
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
          maxLength={1000}
          className="w-full bg-black border border-yellow-500/20 rounded-lg p-3"
        />
        <p className="text-sm text-gray-500 mt-2">
          {form.deskripsi.length} / 1000 karakter
        </p>
      </div>

      {/* Upload */}
      <div>

        <label className="block mb-2">
          Foto
          <span className="text-red-500">
            *
          </span>
        </label>

        <div className="border border-yellow-500/20 rounded-2xl p-4 space-y-4">
          {preview ? (
            <div className="relative w-full min-h-[20rem] rounded-xl overflow-hidden border border-yellow-500/20 bg-black">
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-contain"
                unoptimized
              />

              <label className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/80 px-4 py-2 text-sm font-medium text-white border border-yellow-500/30 cursor-pointer hover:bg-black">
                Ubah Foto
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          ) : (
            <label className="block w-full border border-dashed border-yellow-500/40 rounded-xl p-10 text-center cursor-pointer hover:border-yellow-400 transition">
              <p className="text-white font-medium">
                Upload Foto Organisme
              </p>

              <p className="text-gray-400 text-sm mt-1">
                JPG, PNG maksimal 5 MB
              </p>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={uploading}
        className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg disabled:opacity-50"
      >
        {uploading
          ? "Mengirim..."
          : "Kirim Sighting"}
      </button>

    </form>
  );
}