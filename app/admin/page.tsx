import LeadsDashboard from "@/components/admin/leads-dashboard"

export const metadata = {
    title: "Admin Dashboard | INK Studio",
    description: "Manage tattoo booking leads",
}

export default function AdminPage() {
    return (
        <main className="min-h-screen bg-black pt-32 pb-20">
            <LeadsDashboard />
        </main>
    )
}
