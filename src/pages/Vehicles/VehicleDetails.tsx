import { useParams } from "react-router-dom";

export default function VehicleDetails() {
  const { id } = useParams<{ id: string }>();
  return <div></div>;
}
