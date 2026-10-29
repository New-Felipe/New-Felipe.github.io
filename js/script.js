const GITHUB_USERNAME = "New-Felipe";

async function buscarRepositorio(nomeRepositorio) {
    const url = `https://api.github.com/repos/${GITHUB_USERNAME}/${nomeRepositorio}`;

    try {
        const resposta = await fetch(url);

        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        const repositorio = await resposta.json();

        console.log("Repositório encontrado:", {
            nome: repositorio.name,
            descricao: repositorio.description,
            linguagem: repositorio.language,
            url: repositorio.html_url,
            atualizadoEm: repositorio.updated_at
        });

        return repositorio;

    } catch (erro) {
        console.error("Erro ao consultar o GitHub:", erro);
        return null;
    }
}

atualizarDataProjeto(
    "task-manager-api",
    "task-manager-atualizacao"
);

atualizarDataProjeto(
    "trabalho_final_web",
    "monte-pc-atualizacao"
);

atualizarDataProjeto(
    "enade-bigdata",
    "enade-atualizacao"
);

atualizarDataProjeto(
    "App",
    "app-atualizacao"
);

async function atualizarDataProjeto(nomeRepositorio, idElemento) {
    const repositorio = await buscarRepositorio(nomeRepositorio);
    const elemento = document.getElementById(idElemento);

    if (!repositorio || !elemento || !repositorio.pushed_at) {
        return;
    }

    const data = new Date(repositorio.pushed_at);

    elemento.textContent =
        `Última atualização: ${data.toLocaleDateString("pt-BR")}`;
}