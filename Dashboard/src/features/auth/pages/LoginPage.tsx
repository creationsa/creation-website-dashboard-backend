import LoginForm from "../components/loginForm";

export default function LoginPage() {
  return (
    <main className="dark:bg-black-700 bg-white-300 dark:text-white-100 text-black-100 flex min-h-screen items-center justify-center p-4">
      <div className="bg-white-200 dark:bg-black-800 w-full max-w-md rounded-xl p-8 shadow-lg">
        <LoginForm />
      </div>
    </main>
  );
}
