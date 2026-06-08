    "use client";

    import { useEffect, useState } from "react";
    import Image from "next/image";
    import Link from "next/link";

    import {
    useParams,
    useRouter,
    } from "next/navigation";

    import { Sighting } from "@/types/sighting";

    import {
    getSightingById,
    } from "@/services/sighting.service";

    import {
    approveSpeciesReview,
    rejectSpeciesReview,
    } from "@/services/admin-species.service";

    export default function SpeciesReviewDetailPage() {

    const params =
        useParams();

    const router =
        useRouter();

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [sighting, setSighting] =
        useState<Sighting | null>(
        null
        );

    const [form, setForm] =
        useState({
        species: "",
        nama_lokal: "",
        nama_internasional: "",
        ordo: "",
        family: "",
        occurrence: "native",
        status_konservasi: "",
        deskripsi: "",
        });

    useEffect(() => {

        async function loadData() {

        const data =
            await getSightingById(
            params.id as string
            );

        if (!data) {
            setLoading(false);
            return;
        }

        setSighting(data);

        setForm({
            species:
            data.nama_ilmiah ?? "",

            nama_lokal:
            data.nama_lokal ?? "",

            nama_internasional: "",

            ordo: "",

            family: "",

            occurrence: "native",

            status_konservasi: "",

            deskripsi:
            data.deskripsi ?? "",
        });

        setLoading(false);
        }

        loadData();

    }, [params.id]);

    function validateForm() {

        if (!form.species) {
        alert(
            "Species wajib diisi"
        );
        return false;
        }

        if (!form.ordo) {
        alert(
            "Ordo wajib diisi"
        );
        return false;
        }

        if (!form.family) {
        alert(
            "Family wajib diisi"
        );
        return false;
        }

        return true;
    }

    async function handleApprove() {

        if (!sighting) return;

        if (!validateForm()) {
        return;
        }

        try {

        setSaving(true);

        await approveSpeciesReview(
            sighting.id,
            form
        );

        alert(
            "Species berhasil ditambahkan"
        );

        await router.push(
            "/admin/species-review"
        );

        router.refresh();

        } catch (error: unknown) {
            console.error("APPROVE ERROR:", error);

            const message =
                error instanceof Error
                    ? error.message
                    : JSON.stringify(error);

            alert(message);
        } finally {
            setSaving(false);
        }
    }

    async function handleReject() {

        if (!sighting) return;

        try {

        setSaving(true);

        await rejectSpeciesReview(
            sighting.id
        );

        alert(
            "Species ditolak"
        );

        await router.push(
            "/admin/species-review"
        );

        router.refresh();

        } catch (error) {

        console.error(error);

        alert(
            "Gagal menolak species"
        );

        } finally {

        setSaving(false);

        }
    }

    if (loading) {
        return (
        <div>
            Memuat data...
        </div>
        );
    }

    if (!sighting) {
        return (
        <div>
            Data tidak ditemukan
        </div>
        );
    }

    return (
        <div>
            <Link
            href="/admin/species-review"
            className="
            inline-flex
            items-center
            gap-2
            text-yellow-400
            hover:text-yellow-300
            mb-6
            "
            >
            ← Kembali ke Review Species
            </Link>

        <h1
            className="
            text-4xl
            font-bold
            mb-8
            "
        >
            Review Species Baru
        </h1>

        <div
            className="
            bg-neutral-950
            border
            border-yellow-500/20
            rounded-xl
            p-8
            "
        >

            {sighting.foto_url && (
            <Image
                src={sighting.foto_url}
                alt={
                sighting.nama_lokal ??
                sighting.nama_ilmiah ??
                "Foto sighting"
                }
                width={1200}
                height={500}
                className="
                w-full
                h-96
                object-cover
                rounded-xl
                mb-8
                "
            />
            )}

            <div className="space-y-3">

            <p>
                <b>Nama Lokal:</b>{" "}
                {sighting.nama_lokal}
            </p>

            <p>
                <b>Nama Ilmiah:</b>{" "}
                {sighting.nama_ilmiah}
            </p>

            <p>
                <b>Lokasi:</b>{" "}
                {sighting.nama_lokasi}
            </p>

            <p>
                <b>Provinsi:</b>{" "}
                {sighting.provinsi}
            </p>

            <p>
                <b>Habitat:</b>{" "}
                {sighting.habitat}
            </p>

            <p>
                <b>Substrat:</b>{" "}
                {sighting.substrat}
            </p>

            <p>
                <b>Deskripsi:</b>{" "}
                {sighting.deskripsi}
            </p>

            </div>

            <div
            className="
            mt-10
            border-t
            border-yellow-500/20
            pt-8
            "
            >

            <h2
                className="
                text-2xl
                font-bold
                mb-6
                "
            >
                Data Species
            </h2>

            <div className="space-y-4">

                <input
                value={form.species}
                onChange={(e) =>
                    setForm({
                    ...form,
                    species:
                        e.target.value,
                    })
                }
                placeholder="Species"
                className="w-full bg-black border border-yellow-500/20 rounded-lg p-3"
                />

                <input
                value={form.nama_lokal}
                onChange={(e) =>
                    setForm({
                    ...form,
                    nama_lokal:
                        e.target.value,
                    })
                }
                placeholder="Nama Lokal"
                className="w-full bg-black border border-yellow-500/20 rounded-lg p-3"
                />

                <input
                value={
                    form.nama_internasional
                }
                onChange={(e) =>
                    setForm({
                    ...form,
                    nama_internasional:
                        e.target.value,
                    })
                }
                placeholder="Nama Internasional"
                className="w-full bg-black border border-yellow-500/20 rounded-lg p-3"
                />

                <input
                value={form.ordo}
                onChange={(e) =>
                    setForm({
                    ...form,
                    ordo:
                        e.target.value,
                    })
                }
                placeholder="Ordo"
                className="w-full bg-black border border-yellow-500/20 rounded-lg p-3"
                />

                <input
                value={form.family}
                onChange={(e) =>
                    setForm({
                    ...form,
                    family:
                        e.target.value,
                    })
                }
                placeholder="Family"
                className="w-full bg-black border border-yellow-500/20 rounded-lg p-3"
                />

                <select
                value={
                    form.occurrence
                }
                onChange={(e) =>
                    setForm({
                    ...form,
                    occurrence:
                        e.target.value,
                    })
                }
                className="w-full bg-black border border-yellow-500/20 rounded-lg p-3"
                >
                <option value="native">
                    Native
                </option>

                <option value="endemic">
                    Endemic
                </option>

                <option value="introduced">
                    Introduced
                </option>

                <option value="invasive">
                    Invasive
                </option>
                </select>

                <input
                value={
                    form.status_konservasi
                }
                onChange={(e) =>
                    setForm({
                    ...form,
                    status_konservasi:
                        e.target.value,
                    })
                }
                placeholder="Status Konservasi"
                className="w-full bg-black border border-yellow-500/20 rounded-lg p-3"
                />

                <textarea
                rows={5}
                value={
                    form.deskripsi
                }
                onChange={(e) =>
                    setForm({
                    ...form,
                    deskripsi:
                        e.target.value,
                    })
                }
                placeholder="Deskripsi Species"
                className="w-full bg-black border border-yellow-500/20 rounded-lg p-3"
                />

            </div>

            </div>

{sighting.status === "menunggu" ? (
          <div
            className="
            flex
            gap-4
            mt-8
            "
          >

            <button
              onClick={handleApprove}
              disabled={saving}
              className="
              bg-green-600
              px-6
              py-3
              rounded-lg
              font-semibold
              disabled:opacity-50
              "
            >
              {saving
                ? "Menyimpan..."
                : "Setujui Species"}
            </button>

            <button
              onClick={handleReject}
              disabled={saving}
              className="
              bg-red-600
              px-6
              py-3
              rounded-lg
              font-semibold
              disabled:opacity-50
              "
            >
              Tolak Species
            </button>

          </div>
        ) : (
          <div className="mt-8 rounded-xl border border-yellow-500/20 bg-neutral-900 p-4 text-sm text-gray-300">
            Status review sudah <span className="font-semibold text-white">{sighting.status}</span>.
            {sighting.status === "disetujui" ? " Spesies ini sudah ditambahkan ke database." : ""}
          </div>
        )}

        </div>

        </div>
    );
    }