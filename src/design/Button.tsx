import { children, type Component, type ParentProps } from "solid-js";

interface ButtonProps {
  onClick: () => void;
}

const Button: Component<ParentProps<ButtonProps>> = (props) => {
  const c = children(() => props.children);
  return (
    <button
      class="border border-black bg-gray-200 hover:bg-blue-300 rounded-md px-2 py-1"
      type="button"
      onClick={() => props.onClick()}
    >
      {c()}
    </button>
  );
};

export default Button;
