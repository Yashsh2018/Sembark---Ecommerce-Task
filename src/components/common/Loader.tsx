import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div className="d-flex justify-content-center py-5">
      <Spinner animation="border" variant="dark" />
    </div>
  );
};

export default Loader;