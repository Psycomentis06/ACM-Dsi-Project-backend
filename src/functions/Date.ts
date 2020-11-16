export function CalculateAge(birth_date: Date):number {
    let diff_ms = Date.now() - birth_date.getTime();
    let age_dt = new Date(diff_ms); 
  
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}