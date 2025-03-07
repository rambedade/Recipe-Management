import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import styles from "../styles/DragDrop.module.css";

const DragDropOrganizer = ({ recipes, setRecipes, isSorted, onEdit }) => {
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setRecipes((prev) => {
      const oldIndex = prev.findIndex((recipe) => recipe._id === active.id);
      const newIndex = prev.findIndex((recipe) => recipe._id === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={recipes.map((r) => r._id || r.name)} strategy={verticalListSortingStrategy}>
        <div className={styles.recipeContainer}>
          {recipes.map((recipe, index) =>
            recipe.type === "category" ? (
              <h3 key={`category-${index}`} className={styles.categoryHeader}>{recipe.name}</h3> // ✅ Category Header
            ) : (
              <SortableItem key={recipe._id} recipe={recipe} onEdit={onEdit} />
            )
          )}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default DragDropOrganizer;
