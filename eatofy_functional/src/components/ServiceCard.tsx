import Image from 'next/image';

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  imageSrc: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, features, imageSrc }) => {
  return (
    <div className="w-[100%] m-5 justify-center flex flex-col md:flex-row items-center bg-gray-50 p-6 rounded-lg shadow-md">
      <div className="w-full md:w-1/3">
        <Image src={imageSrc} alt={title} width={500} height={300} className="rounded-lg" />
      </div>
      <div className=" md:w-2/3 mt-6 md:mt-0 md:ml-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <ul className="list-disc list-inside text-gray-600">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg">View Details</button>
      </div>
    </div>
  );
};

export default ServiceCard;
