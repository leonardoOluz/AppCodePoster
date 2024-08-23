export const useSession = () => {

  function saveSession(session) {
    const newSession = JSON.stringify(session);
    sessionStorage.setItem('appCodePoster', newSession);
  }

  function verificarSessao() {
    const checado = sessionStorage.getItem('appCodePoster');
    return JSON.parse(checado);
  }

  function limparSessao() {
    sessionStorage.clear();
  }

  return {
    saveSession,
    verificarSessao,
    limparSessao
  }
}