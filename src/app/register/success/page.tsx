import AuthLayout from "@/components/auth/AuthLayout";


export default function RegisterSuccessPage() {
    return (
        <AuthLayout title="Cek Email Anda" subtitle="Kami telah mengirim email verifikasi.
                Silakan buka email Anda dan klik
                tautan verifikasi sebelum login.">
            <div className="space-y-4">
            </div>
        </AuthLayout>
        
    );
}