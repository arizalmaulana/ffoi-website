"use client";

import { useEffect, useState } from "react";

import { Species } from "@/types/species";
import { getSpecies, getSpeciesCount } from "@/services/species.service";
import { getOrdoOptions, getFamilyOptions } from "@/services/species.service";

import DatabaseTable from "@/components/database/DatabaseTable";
import SearchBar from "@/components/database/SearchBar";
import FilterBar from "@/components/database/FilterBar";
import Pagination from "@/components/database/Pagination";


export default function DatabasePage() {
    const [species, setSpecies] = useState<Species[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [ordo, setOrdo] = useState("");
    const [family, setFamily] = useState("");
    const [occurrence, setOccurrence] =
    useState("");

    const [ordoOptions, setOrdoOptions] =
    useState<string[]>([]);

    const [familyOptions, setFamilyOptions] =
    useState<string[]>([]);

    const [page, setPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
    
    
    async function loadData() {
        setLoading(true);

        const data = await getSpecies(page);

        const count = await getSpeciesCount();

        const ordoData = await getOrdoOptions();
        const familyData = await getFamilyOptions();

        setOrdoOptions(ordoData);
        setFamilyOptions(familyData);

        setSpecies(data);

        setTotalPages(
        Math.ceil(count / 100)
        );

        setLoading(false);
    }

    

    loadData();
    }, [page]);

    const filteredSpecies =
        species.filter((item) => {

            const keyword =
            search.toLowerCase();

            const matchSearch =
            item.species
                ?.toLowerCase()
                .includes(keyword)

            ||

            item.nama_lokal
                ?.toLowerCase()
                .includes(keyword);

            const matchOrdo =
            !ordo ||
            item.ordo === ordo;

            const matchFamily =
            !family ||
            item.family === family;

            const matchOccurrence =
            !occurrence ||
            item.occurrence === occurrence;

            return (
            matchSearch &&
            matchOrdo &&
            matchFamily &&
            matchOccurrence
            );
        });

  return (
    <main className="min-h-screen bg-black text-white px-6 md:px-10 py-20">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold mb-4">
          Database Ikan Indonesia
        </h1>

        <p className="text-gray-400 mb-10">
            Referensi biodiversitas ikan air tawar Indonesia.
        </p>
        <SearchBar
            value={search}
            onChange={setSearch}
        />
        <FilterBar
        ordo={ordo}
        family={family}
        occurrence={occurrence}

        setOrdo={setOrdo}
        setFamily={setFamily}
        setOccurrence={setOccurrence}

        ordoOptions={ordoOptions}
        familyOptions={familyOptions}
        />

        {loading ? (
          <p>Memuat data...</p>
        ) : (
            <DatabaseTable data={filteredSpecies} />
        )}

        <Pagination
            page={page}
            totalPages={totalPages}
            setPage={setPage}
        />

      </div>
    </main>
  );
}