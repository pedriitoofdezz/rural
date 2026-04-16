import { alojamientosMock } from "../mocks/alojamientos";

export async function getAlojamientos() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(alojamientosMock);
    }, 500);
  });
}
