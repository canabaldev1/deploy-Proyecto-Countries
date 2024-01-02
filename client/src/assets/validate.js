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
  duration = parseInt(duration, 10);
  if (isNaN(duration) || duration <= 0) {
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

  setActivityError(error);

  return error;
}

export default validate;
