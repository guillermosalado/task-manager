export const navbarTemplate = {
    guest: `
        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <a class="nav-link" href="/">
                    <i class="fas fa-home"></i> Inicio
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/contacto">
                    <i class="fas fa-envelope"></i> Contacto
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/login">
                    <i class="fas fa-sign-in-alt"></i> Iniciar Sesión
                </a>
            </li>
        </ul>
    `,
    user: `
        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <a class="nav-link" href="/">
                    <i class="fas fa-home"></i> Inicio
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/kanban">
                    <i class="fas fa-tasks"></i> Tablero
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/contacto">
                    <i class="fas fa-envelope"></i> Contacto
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" id="logout">
                    <i class="fas fa-sign-out-alt"></i> Cerrar Sesión
                </a>
            </li>
        </ul>
    `
};