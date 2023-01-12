import "./chart";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const className = {
  wrapper: "m-4 p-4 shadow-xl rounded-xl bg-accent",
  title: "mb-4 text-xl font-semibold",
};

export default function Chart({ title, data, dataKey, grid }) {
  return (
    <div className={className.wrapper}>
      <h3 className={className.title}>{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#3b83f6" />
          <Line type="monotone" dataKey={dataKey} stroke="#3b83f6" />
          <Tooltip />
          {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
