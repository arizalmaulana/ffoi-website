"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import {
  getAllUsers,
  searchUsers,
} from "@/services/admin-user.service";

import { Profile }
from "@/types/profile";

export default function AdminUsersPage() {

  const [loading, setLoading] =
    useState(true);

  const [keyword, setKeyword] =
    useState("");

  const [users, setUsers] =
    useState<Profile[]>([]);

  useEffect(() => {
    let active = true;

    async function loadData() {
      try {
        const result = await getAllUsers();
        if (active) setUsers(result);
      } catch (error) {
        console.error(error);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadData();
    return () => {
      active = false;
    };
  }, []);

  async function handleSearch(
    value: string
  ) {

    setKeyword(value);

    if (!value.trim()) {

      const result =
        await getAllUsers();

      setUsers(result);

      return;
    }

    const result =
      await searchUsers(
        value
      );

    setUsers(result);
  }

  if (loading) {
    return (
      <div>
        Memuat data...
      </div>
    );
  }

  return (
    <div>

      <h1
        className="
        text-4xl
        font-bold
        mb-8
        "
      >
        Manajemen Pengguna
      </h1>

      <input
        value={keyword}
        onChange={(e) =>
          handleSearch(
            e.target.value
          )
        }
        placeholder="Cari pengguna..."
        className="
        w-full
        bg-neutral-950
        border
        border-yellow-500/20
        rounded-xl
        p-4
        mb-6
        "
      />

      <div
        className="
        bg-neutral-950
        border
        border-yellow-500/20
        rounded-xl
        overflow-x-auto
        "
      >

        <table className="w-full min-w-[640px]">

          <thead>

            <tr
              className="
              border-b
              border-yellow-500/20
              "
            >

              <th className="p-4 text-left">
                Username
              </th>

              <th className="p-4 text-left">
                Nama
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                Role
              </th>

              <th className="p-4 text-left">
                Aksi
              </th>

            </tr>

          </thead>

          <tbody>

            {users.map(
              (user) => (

              <tr
                key={user.id}
                className="
                border-b
                border-yellow-500/10
                "
              >

                <td className="p-4">
                  {user.username}
                </td>

                <td className="p-4">
                  {user.nama_lengkap}
                </td>

                <td className="p-4">
                  {user.email}
                </td>

                <td className="p-4">

                  <span
                    className={`
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      ${
                        user.role ===
                        "admin"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-green-500/20 text-green-400"
                      }
                    `}
                  >
                    {user.role}
                  </span>

                </td>

                <td className="p-4">

                  <Link
                    href={`/admin/users/${user.id}`}
                    className="
                    bg-yellow-400
                    text-black
                    px-4
                    py-2
                    rounded-lg
                    font-semibold
                    "
                  >
                    Detail
                  </Link>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}