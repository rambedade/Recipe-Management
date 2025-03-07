import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Link } from "react-router-dom";
import styles from "../styles/SortableItem.module.css";

const SortableItem = ({ recipe, onEdit }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: recipe._id });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={styles.recipeCard}
      style={{ transform: CSS.Transform.toString(transform), transition }}
    >
      <Link to={`/recipe/${recipe._id}`} className={styles.recipeLink}>
        <img src={recipe.image} alt={recipe.title} className={styles.recipeImage} />
        <p className={styles.recipeTitle}>{recipe.title}</p>
      </Link>
      <button className={styles.editBtn} onClick={() => onEdit(recipe)}>Edit</button>
    </div>
  );
};

export default SortableItem;
