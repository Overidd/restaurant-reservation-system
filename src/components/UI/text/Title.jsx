import PropTypes from 'prop-types';

export const Title = ({ className, primary, secondary }) => {
   return (
      <h2 className={`text-center w-fit ${className}`}>
         <span className="block text-red-500 text-base font-extrabold tracking-wide uppercase font-oswald">
            {primary}
         </span>
         <span className="block text-5xl font-extrabold font-playfair uppercase">
            {secondary}
         </span>
      </h2>
   )
}

Title.propTypes = {
   className: PropTypes.string,
   primary: PropTypes.string,
   secondary: PropTypes.string,
}
