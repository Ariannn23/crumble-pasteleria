const PaymentSection = ({ total = 0, cash = "", setCash }) => {
  const cashNumber = parseFloat(cash || "0");
  const change =
    !isNaN(cashNumber) && cashNumber >= total ? cashNumber - total : 0;

  const handleChange = (e) => {
    if (!setCash) return;
    let value = e.target.value;

    // permitir solo números y decimales
    value = value.replace(/[^0-9.]/g, "");

    // evitar más de un punto decimal
    const parts = value.split(".");
    if (parts.length > 2) return;

    setCash(value);
  };

  const formatMoney = (amount) => `S/. ${(amount || 0).toFixed(2)}`;

  return (
    <div className="mt-4 space-y-3">
      <div>
        <label className="text-sm font-medium block mb-1">
          Monto entregado
        </label>
        <input
          type="text"
          inputMode="decimal"
          placeholder="S/. 0.00"
          value={cash}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />
      </div>

      <div className="flex justify-between text-sm">
        <span>Total</span>
        <span>{formatMoney(total)}</span>
      </div>

      <div className="flex justify-between text-sm font-medium">
        <span>Vuelto</span>
        <span>{cashNumber >= total ? formatMoney(change) : "—"}</span>
      </div>

      {cash && cashNumber < total && (
        <p className="text-xs text-red-500">Monto insuficiente</p>
      )}
    </div>
  );
};

export default PaymentSection;
