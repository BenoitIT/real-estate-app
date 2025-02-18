interface CardProps{
    icon:any;
    title:string;
    description:string;
    }
    const Card = ({icon,title,description}:CardProps) => {
      return (
        <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl gap-2">
          <div className="bg-emerald-900 text-white h-14 w-14 text-2xl rounded-full flex justify-center items-center">
          {icon}
          </div>
          <h4 className="text-base font-bold leading-snug tracking-tight mb-1">
            {title}
          </h4>
          <p className="text-gray-600 text-center text-sm">
            {description}
          </p>
        </div>
      );
    };
    export default Card;