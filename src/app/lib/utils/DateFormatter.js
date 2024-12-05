export default function FormatDate(date) {
  try {

    const now = new Date(date).toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    });

    // Parse the IST date back to a Date object
    const istDate = new Date(now);

    // Format the date as "1 December 2023"
    const formattedDate = new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(istDate);

    return formattedDate;
  } catch (error) {
    return {
      returncode: 500,
      message: error.message,
      output: []
    }
  }

}
