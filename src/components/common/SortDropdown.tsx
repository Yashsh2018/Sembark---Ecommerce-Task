import Form from "react-bootstrap/Form";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SortDropdown = ({ value, onChange }: Props) => {
  return (
    <Form.Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Sort By</option>
      <option value="low">Price: Low to High</option>
      <option value="high">Price: High to Low</option>
    </Form.Select>
  );
};

export default SortDropdown;