export default function LogoutFromLS() {
  const localStorage = window.localStorage;
  localStorage.removeItem("persist:auth");
}
