/* Siri Equation
** % Body Fat = (495 / Body Density) - 450.
*/
function siriEquation(bd) {
   return (495 / bd) - 450;
}

/* MALE
** sos -> sum of skinfold 
** ( Chest, Axilla, Tricep, Subscapular, Abdominal, Suprailiac and Thigh )
** measured in mm
** (reference: Jackson, A.S. & Pollock, M.L. (1978), based on a sample aged 18-61)
*/
export const pollockMale7skinfold = (sos, age) => {
   const bodyDensity = 1.112
                     - (0.00043499 * sos)
                     + (0.00000055 * Math.pow(sos, 2))
                     - (0.00028826 * age);

   const bodyPercentage = siriEquation(bodyDensity);

   return (Math.round(bodyPercentage * 100) / 100).toFixed(2);
};

/* FEMALE
** sos -> sum of skinfold 
** ( Chest, Axilla, Tricep, Subscapular, Abdominal, Suprailiac and Thigh )
** measured in mm
** (reference: Jackson, et al. (1980), based on a sample aged 18-55)
*/
export const pollockFemale7skinfold = (sos, age) => {
   const bodyDensity = 1.097
                     - (0.00046971 * sos)
                     + (0.00000056 * Math.pow(sos, 2))
                     - (0.00012828 * age);

   const bodyPercentage = siriEquation(bodyDensity);

   return (Math.round(bodyPercentage * 100) / 100).toFixed(2);
}