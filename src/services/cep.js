export function formatCep(value = "") {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  return digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
}

export async function lookupCep(value) {
  const digits = value.replace(/\D/g, "");
  if (digits.length !== 8) throw new Error("Digite um CEP com 8 números.");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  let response;
  try {
    response = await fetch(`https://viacep.com.br/ws/${digits}/json/`, {
      signal: controller.signal,
    });
  } catch (error) {
    if (error?.name === "AbortError") {
      throw new Error("A consulta demorou demais. Tente novamente ou preencha manualmente.");
    }
    throw new Error("Não foi possível consultar o CEP. Verifique sua conexão.");
  } finally {
    clearTimeout(timeout);
  }
  if (!response.ok) throw new Error("Não foi possível consultar o CEP.");
  const data = await response.json();
  if (data.erro) throw new Error("CEP não encontrado.");
  return data;
}
