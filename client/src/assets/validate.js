function validate(
  { name, difficulty, duration, season, countries },
  setActivityError
) {
  const error = {};

  // Validación para el nombre
  if (/[\d]/.test(name)) {
    error.name = "Name should not contain numbers.";
  }

  if (!name.length) {
    error.name = "You should provide a name";
  }

  // Validación para la dificultad
  difficulty = parseInt(difficulty, 10);
  if (isNaN(difficulty) || difficulty < 1 || difficulty > 5) {
    error.difficulty = "Difficulty should be an integer between 1 and 5.";
  }

  // Validación para la duración
  duration = Number(duration);
  if (isNaN(duration) || duration <= 0 || !Number.isInteger(duration)) {
    error.duration = "Duration should be a positive integer.";
  }

  // Validación para la temporada
  const validSeasons = ["Summer", "Fall", "Winter", "Spring"];
  if (!validSeasons.includes(season)) {
    error.season = "Season should be Summer, Fall, Winter, or Spring.";
  }

  // Validación para los paises
  if (!countries.length) {
    error.countries = "Include at least one country";
  }
  console.log(error);
  setActivityError(error);

  return error;
}

export default validate;
