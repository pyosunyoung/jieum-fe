import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import "./HomepageComponent.style.css";

const CategoryRow = ({item,likes}) => {
    // console.log(item);
  return (
    <div className="study-item1">
      <div className="item-badge-section">
        <span className="list-badge-style recruit-badge">모집중</span>
        {item.category.map((badge) => (
          <span className="list-badge-style">{badge}</span>
        ))}
      </div>

      <div className="study-item-title-section">
        <div className="study-item-subtitle sub-text">#{item.sku}</div>
        <div className="study-item-title">{item.name}</div>
      </div>

      <div className="study-item-button-section">
        <FavoriteBorderIcon className="study-item-icon" />
        {/* likes 값이 있으면 표시 */}
        {likes !== 1 && <div className="icon-number">{likes}</div>}
        <ArchiveOutlinedIcon className="study-item-icon" />
        <div className="icon-number">{2}</div>
      </div>
    </div>
  );
};

export default CategoryRow;
