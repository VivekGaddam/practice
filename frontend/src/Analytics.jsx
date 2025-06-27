import { useParams } from 'react-router-dom';

function Analytics() {
  const { name } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-indigo-600">
        Analytics for: {decodeURIComponent(name)}
      </h1>
    </div>
  );
}

export default Analytics;
