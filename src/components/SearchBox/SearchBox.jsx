import { useDispatch, useSelector } from "react-redux";
import { changeFilter, selectFilter } from "../../redux/filtersSlice";
import css from "./SearchBox.module.css";

export default function SearchBox() {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const handleChange = (event) => {
    dispatch(changeFilter(event.target.value));
  };

  return (
    <div className={css.container}>
      <p className={css.text}>Find contact by name</p>
      <input
        type="text"
        value={filter}
        onChange={handleChange}
        className={css.input}
        placeholder="Search contacts..."
      />
    </div>
  );
}
