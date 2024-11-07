export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <section className="flex ">
            <div>
                <h1>Dashboard</h1>
                <ul>optins</ul>
            </div>
            <div>
                {children}
            </div>
        </section>
    )
  }