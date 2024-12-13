import { Link } from "react-router-dom";

const StripeSuccessPage = () => {
  return (
    <div className="w-full flex flex-col  justify-center items-center leading-8">
      <h1 className="text-2xl ">Payment Successful</h1>
      <p className="my-3">Thank you for your purchase!</p>
      {/* <ul className="py-5">
        {products.map((product, index) => (
          <li key={index} className="text-xl font-medium">
            {product.name}: $
            {product.price ? (product.price / 100).toFixed(2) : "0.00"}
          </li>
        ))}
      </ul> */}
      <button>
        <Link
          className="bg-gray-800 text-white px-4 py-2 rounded-lg"
          to="/dashboard/analysis"
        >
          Back To Dashboard
        </Link>
      </button>
    </div>
  );
};

export default StripeSuccessPage;
