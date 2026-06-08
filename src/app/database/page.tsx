"use client";

import { useEffect, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaMailBulk,
  FaGlobe,
  FaMapMarker,
} from "react-icons/fa";

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

      {/* ================= FOOTER ================= */}
          <footer className="bg-black text-white pt-20 px-6 md:px-16">
      
            {/* TOP CTA */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold tracking-wide mb-6">
                MAKE A <br /> DIFFERENCE
              </h2>
      
              <button className="bg-yellow-400 text-black px-6 py-3 rounded-md font-semibold hover:bg-yellow-300 transition">
                SUPPORT US
              </button>
            </div>
      
            {/* FOOTER GRID */}
            <div className="grid md:grid-cols-3 gap-10 pb-10 border-b border-white/10">
      
              {/* TENTANG */}
              <div>
                <h3 className="font-semibold mb-4 text-sm tracking-wide">
                  TENTANG KAMI
                </h3>
      
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>
                    <a href="/tentang#visi-misi" className="hover:text-yellow-400">
                      Visi dan Misi
                    </a>
                  </li>
      
                  <li>
                    <a href="/tentang#tim-kami" className="hover:text-yellow-400">
                      Tim Kami
                    </a>
                  </li>
      
                  <li>
                    <a href="/tentang#kemitraan" className="hover:text-yellow-400">
                      Kemitraan
                    </a>
                  </li>
      
                  <li>
                    <a href="/tentang#dokumen" className="hover:text-yellow-400">
                      Dokumen
                    </a>
                  </li>
                </ul>
              </div>
      
              {/* KONTAK */}
              <div>
                <h3 className="font-semibold mb-4 text-sm tracking-wide">
                  KONTAK
                </h3>
      
                <ul className="space-y-3 text-gray-400 text-sm">
                  <li className="flex items-center gap-2">
                      <FaMailBulk size={16} className="text-yellow-400" />
                      freshwaterfishofindonesia@gmail.com
                    </li>
      
                    <li className="flex items-center gap-2">
                      <FaGlobe size={16} className="text-yellow-400" />
                      ffoi.or.id
                    </li>
      
                    <li className="flex items-center gap-2">
                      <FaMapMarker size={16} className="text-yellow-400" />
                      Indonesia
                    </li>
                  </ul>
              </div>
      
              {/* SOCIAL + EMAIL */}
              <div>
                <h3 className="font-semibold mb-4 text-sm tracking-wide">
                  IKUTI KAMI
                </h3>
      
                {/* SOCIAL ICON */}
                <div className="flex gap-4 mb-6">
                  <a
                    href="https://www.instagram.com/freshwaterfishofindonesia?igsh=MXR4N25oeHEyN3pwcg=="
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram FFOI"
                  >
                    <FaInstagram className="w-6 h-6 text-white hover:text-yellow-400 transition cursor-pointer" />
                  </a>
      
                  <a
                    href="https://www.facebook.com/share/1FMzGXXemk/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook FFOI"
                  >
                    <FaFacebook className="w-6 h-6 text-white  hover:text-yellow-400 transition cursor-pointer" />
                  </a>
      
                </div>
              </div>
      
            </div>
      
            {/* COPYRIGHT */}
            <div className="text-center text-gray-500 text-xs py-6">
              2026 Yayasan Freshwater Fish of Indonesia (FFOI). All rights reserved.
            </div>
      
          </footer>
    </main>
  );
}