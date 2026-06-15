"use client";

import { useEffect, useState } from "react";

import { Species } from "@/types/species";

import { searchSpecies } from "@/services/species.service";

type SpeciesResult = Pick<
  Species,
  | "id"
  | "species"
  | "nama_lokal"
>;

interface Props {
  onSelect: (
    species: SpeciesResult
  ) => void;
  onClear?: () => void;
}

export default function SpeciesCombobox({
  onSelect,
  onClear,
}: Props) {
  const [keyword, setKeyword] =
    useState("");

  const [results, setResults] =
    useState<SpeciesResult[]>([]);

  const [open, setOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [selectedKeyword,
    setSelectedKeyword] =
    useState("");

  const [selectedId,
    setSelectedId] =
    useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(
      async () => {
        if (
          keyword.trim().length < 2
        ) {
          setResults([]);
          setOpen(false);
          return;
        }

        if (
          selectedId !== null &&
          keyword === selectedKeyword
        ) {
          return;
        }

        setLoading(true);

        const data =
          await searchSpecies(keyword);

        setResults(data);

        setOpen(true);

        setLoading(false);
      },
      300
    );

    return () =>
      clearTimeout(timer);
  }, [keyword, selectedId, selectedKeyword]);

  return (
    <div className="relative">

      <input
        type="text"
        value={keyword}
        onChange={(e) => {
          const nextKeyword =
            e.target.value;

          setKeyword(nextKeyword);
          setOpen(true);

          if (selectedId !== null) {
            setSelectedId(null);
            setSelectedKeyword("");
            onClear?.();
          }
        }}
        placeholder="Cari nama lokal atau nama ilmiah..."
        className="w-full bg-neutral-900 border border-yellow-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400"/>

      {open && !(selectedId !== null && keyword === selectedKeyword) && (
        <div
          className="absolute top-full left-0 right-0 mt-1 bg-neutral-950 border border-yellow-500/20 rounded-lg overflow-hidden z-50 max-h-80 overflow-y-auto"
        >

          {loading && (
            <div className="p-4 text-gray-400">
              Mencari...
            </div>
          )}

          {!loading &&
            results.length === 0 &&
            keyword.length >= 2 && (
              <div>
                <div className="p-4 text-gray-400">
                  Spesies tidak ditemukan
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onSelect({
                      id: "",
                      species: keyword,
                      nama_lokal: null,
                    });

                    setSelectedId("");
                    setSelectedKeyword(keyword);
                    setKeyword(keyword);
                    setResults([]);
                    setOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 border-t border-yellow-500/20 text-yellow-400 hover:bg-yellow-500/10"
                >
                  {`+ Ajukan spesies baru "${keyword}"`}
                </button>
              </div>
          )}

          {!loading &&
            results.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  const label =
                    item.nama_lokal
                      ? `${item.nama_lokal} (${item.species})`
                      : item.species;

                  setSelectedId(item.id);
                  setSelectedKeyword(label);
                  setKeyword(label);
                  setResults([]);

                  onSelect(item);

                  setOpen(false);
                }}
                className="w-full text-left px-4 py-3 hover:bg-yellow-500/10 transition"
              >
                <div className="text-white">
                  {item.nama_lokal ??
                    "Belum ada nama lokal"}
                </div>

                <div
                  className="text-sm italic text-gray-400"
                >
                  {item.species}
                </div>
              </button>
            ))}
        </div>
      )}

    </div>
  );
}