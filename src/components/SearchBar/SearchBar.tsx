import { useRef } from "react";
import styles from "./SearchBar.module.css";
import toast from "react-hot-toast";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSearchAction = (formData: FormData) => {
    const query = formData.get("query") as string;

    if (!query || query.trim() === "") {
      toast.error("Please enter your search query.");
      return;
    }

    onSubmit(query.trim());

    formRef.current?.reset();
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form ref={formRef} action={handleSearchAction} className={styles.form}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}

// import styles from "./SearchBar.module.css";
// import toast from "react-hot-toast";

// interface SearchBarProps {
//   onSubmit: (query: string) => void;
// }

// export default function SearchBar({ onSubmit }: SearchBarProps) {
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const form = e.currentTarget;
//     const query = (form.elements.namedItem("query") as HTMLInputElement).value;
//     if (query.trim() === "") {
//       toast.error("Please enter your search query.");
//       return;
//     }
//     onSubmit(query);

//     form.reset();
//   };

//   return (
//     <header className={styles.header}>
//       <div className={styles.container}>
//         <a
//           className={styles.link}
//           href="https://www.themoviedb.org/"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Powered by TMDB
//         </a>
//         <form className={styles.form} onSubmit={handleSubmit}>
//           <input
//             className={styles.input}
//             type="text"
//             name="query"
//             autoComplete="off"
//             placeholder="Search movies..."
//             autoFocus
//           />
//           <button className={styles.button} type="submit">
//             Search
//           </button>
//         </form>
//       </div>
//     </header>
//   );
// }
