import PropTypes from 'prop-types';

export const Title = ({ primary, secondary }) => {
   return (
      <h2 className="text-center w-fit">
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
   primary: PropTypes.string,
   secondary: PropTypes.string,
}
