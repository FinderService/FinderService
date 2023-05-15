export default function Footer() {
    return(
        
        <section className="bg-slate-300 py-6" style={{ position: "fixed", bottom: 0, left: 0, width: "100%" }}>
            <div className="max-w-container h-full mx-auto font-titleFont">
                <ul className="max-w-1/3 text-sm font-titleFont text-slate-700 grid grid-cols-3 gap-2 mt-6">
                    <li>Quiénes somos</li>
                    <li>Top trabajdores</li>
                    <li>Registrate como trabajador</li>
                    <li>Terminos y condiciones</li>
                    <li>Top empleadores</li>
                    <li>Registrate empleador</li>
                    <li>Privacidad</li>
                    <li>Top ciudades</li>
                </ul>
            </div>
        </section>
    );
}