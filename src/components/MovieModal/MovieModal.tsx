import css from "./MovieModal.module.css";
import type { Movie } from "../../types/movie";
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface MovieModalProps {
  movies: Movie;
  onClose: () => void;
}

const modalRoot = document.querySelector("#modal-root") || document.body;

export default function MovieModal({ movies, onClose }: MovieModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  return createPortal(
    <div
      className={css.backdrop}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={css.modal}>
        <button className={css.closeButton} onClick={onClose}>
          &times;
        </button>
        <img
          src={"https://image.tmdb.org/t/p/original/${movie.backdrop_path}"}
          alt={movies.title}
          className={css.image}
        />
        <div className={css.content}>
          <h2>{movies.title}</h2>
          <p>{movies.overview}</p>
          <p>
            <strong>Release Date:</strong> {movies.release_date}
          </p>

          <p>
            <strong>Rating:</strong> {movies.vote_average}/10
          </p>
        </div>
      </div>
    </div>,
    modalRoot
  );
}
