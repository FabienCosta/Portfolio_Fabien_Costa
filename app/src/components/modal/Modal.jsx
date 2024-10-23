import React from "react";
import ReactDOM from "react-dom"; // Correction de l'import pour ReactDOM
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons"; // Icône GitHub
import { faGlobe } from "@fortawesome/free-solid-svg-icons"; // Icône Globe
import { Carousel } from "react-responsive-carousel"; // Composant Carousel
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./modal.scss";

// Composant Modal pour afficher les détails d'un projet
const Modal = ({ project, onClose, images }) => {
  // Ferme la modal si l'utilisateur clique en dehors de celle-ci
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal_overlay")) {
      onClose(); // Ferme la modal si clic en dehors
    }
  };

  // Fonction pour afficher la description du projet (liste ou paragraphe)
  const renderDescription = () => {
    if (Array.isArray(project.description)) {
      return (
        <ul>
          {project.description.map((item, index) => (
            <li key={index}>{item}</li> // Affichage sous forme de liste
          ))}
        </ul>
      );
    }
    return <p>{project.description}</p>; // Affichage sous forme de paragraphe
  };

  return ReactDOM.createPortal(
    <div className="modal_overlay" onClick={handleOverlayClick}>
      <div className="modal">
        {/* Bouton pour fermer la modal */}
        <button className="modal_close" onClick={onClose}>
          × {/* Icône de fermeture */}
        </button>

        {/* Titre et icônes de liens vers GitHub et le site web */}
        <div className="modal_title">
          <h2>{project.name}</h2>
          <div className="modal_icons">
            {/* Lien vers GitHub si disponible */}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
            )}
            {/* Lien vers le site web si disponible */}
            {project.websiteUrl && (
              <a
                href={project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Website"
              >
                <FontAwesomeIcon icon={faGlobe} />
              </a>
            )}
          </div>
        </div>

        {/* Carrousel pour afficher les images du projet */}
        <Carousel showArrows={true} showThumbs={false} className="carousel">
          {images.map((image, index) => (
            <div key={index} className="carousel_img">
              <img
                src={image}
                alt={`Project ${project.name} screenshot ${index + 1}`}
              />
            </div>
          ))}
        </Carousel>

        {/* Affichage de la description du projet */}
        <div className="modal_description">{renderDescription()}</div>
      </div>
    </div>,
    document.getElementById("modal-root") // Utilisation du portail pour rendre la modal
  );
};

export default Modal;
