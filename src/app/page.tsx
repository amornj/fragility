"use client";

import { useState, useMemo } from "react";

interface PatientData {
  gender: "male" | "female" | null;
  procedureType: "tavr" | "savr" | null;
  chairStandsTime: number | null;
  chairStandsUnable: boolean;
  cognitiveImpairment: boolean | null;
  hemoglobin: number | null;
  albumin: number | null;
}

const MORTALITY_DATA: Record<number, { tavr: number; savr: number }> = {
  0: { tavr: 6, savr: 3 },
  1: { tavr: 6, savr: 3 },
  2: { tavr: 15, savr: 7 },
  3: { tavr: 28, savr: 16 },
  4: { tavr: 30, savr: 38 },
  5: { tavr: 65, savr: 50 },
  6: { tavr: 65, savr: 50 },
};

export default function Home() {
  const [data, setData] = useState<PatientData>({
    gender: null,
    procedureType: null,
    chairStandsTime: null,
    chairStandsUnable: false,
    cognitiveImpairment: null,
    hemoglobin: null,
    albumin: null,
  });

  const updateData = (updates: Partial<PatientData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const calculateScore = useMemo(() => {
    let score = 0;

    if (data.chairStandsUnable) {
      score += 2;
    } else if (data.chairStandsTime !== null && data.chairStandsTime > 15 && data.chairStandsTime < 60) {
      score += 1;
    }

    if (data.cognitiveImpairment === true) {
      score += 1;
    }

    if (data.hemoglobin !== null) {
      const threshold = data.gender === "female" ? 12 : 13;
      if (data.hemoglobin < threshold) {
        score += 1;
      }
    }

    if (data.albumin !== null && data.albumin < 3.5) {
      score += 1;
    }

    return score;
  }, [data, data.gender]);

  const getMortality = (procedure: "tavr" | "savr") => {
    return MORTALITY_DATA[calculateScore]?.[procedure] ?? MORTALITY_DATA[0][procedure];
  };

  const getRiskLevel = (mortality: number) => {
    if (mortality <= 6) return { label: "Low Risk", color: "text-green-600", bg: "bg-green-50", border: "border-green-200" };
    if (mortality <= 15) return { label: "Moderate Risk", color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200" };
    if (mortality <= 30) return { label: "High Risk", color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200" };
    return { label: "Very High Risk", color: "text-red-600", bg: "bg-red-50", border: "border-red-200" };
  };

  const isComplete = useMemo(() => {
    return (
      data.gender !== null &&
      data.procedureType !== null &&
      (data.chairStandsTime !== null || data.chairStandsUnable) &&
      data.cognitiveImpairment !== null &&
      data.hemoglobin !== null &&
      data.albumin !== null
    );
  }, [data]);

  const resetForm = () => {
    setData({
      gender: null,
      procedureType: null,
      chairStandsTime: null,
      chairStandsUnable: false,
      cognitiveImpairment: null,
      hemoglobin: null,
      albumin: null,
    });
  };

  const printResults = () => {
    window.print();
  };

  const selectedProcedure = data.procedureType || "tavr";
  const mortality = getMortality(selectedProcedure);
  const riskInfo = getRiskLevel(mortality);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">EFT</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Essential Frailty Toolset</h1>
              <p className="text-sm text-slate-500">Cardiovascular Procedure Risk Calculator</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm">1</span>
                Patient Information
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Gender</label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => updateData({ gender: "male" })}
                      className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                        data.gender === "male"
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-slate-200 hover:border-slate-300 text-slate-600"
                      }`}
                    >
                      Male
                    </button>
                    <button
                      onClick={() => updateData({ gender: "female" })}
                      className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                        data.gender === "female"
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-slate-200 hover:border-slate-300 text-slate-600"
                      }`}
                    >
                      Female
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Procedure Type</label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => updateData({ procedureType: "tavr" })}
                      className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                        data.procedureType === "tavr"
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-slate-200 hover:border-slate-300 text-slate-600"
                      }`}
                    >
                      TAVR
                    </button>
                    <button
                      onClick={() => updateData({ procedureType: "savr" })}
                      className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                        data.procedureType === "savr"
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-slate-200 hover:border-slate-300 text-slate-600"
                      }`}
                    >
                      SAVR
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {data.procedureType === "tavr" ? "Transcatheter Aortic Valve Replacement" : data.procedureType === "savr" ? "Surgical Aortic Valve Replacement" : "Select procedure type"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm">2</span>
                Physical Performance
              </h2>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Chair Stands (5 repetitions)</label>
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="1"
                          max="60"
                          placeholder="Enter time"
                          value={data.chairStandsTime ?? ""}
                          onChange={(e) => {
                            const val = e.target.value ? parseInt(e.target.value) : null;
                            updateData({ chairStandsTime: val, chairStandsUnable: false });
                          }}
                          disabled={data.chairStandsUnable}
                          className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none disabled:bg-slate-100 disabled:text-slate-400"
                        />
                        <span className="text-slate-500">seconds</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">Range: 1-60 seconds</p>
                    </div>
                  </div>
                  <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={data.chairStandsUnable}
                      onChange={(e) => updateData({ chairStandsUnable: e.target.checked, chairStandsTime: e.target.checked ? null : data.chairStandsTime })}
                      className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-slate-700">Unable to complete within 60 seconds</span>
                  </label>
                  {data.chairStandsTime !== null && data.chairStandsTime > 15 && data.chairStandsTime < 60 && (
                    <p className="text-sm text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
                      Time &gt;15 seconds indicates elevated risk (+1 point)
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm">3</span>
                Cognitive Assessment
              </h2>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Cognitive Impairment</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => updateData({ cognitiveImpairment: true })}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                      data.cognitiveImpairment === true
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-slate-200 hover:border-slate-300 text-slate-600"
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => updateData({ cognitiveImpairment: false })}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                      data.cognitiveImpairment === false
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-slate-200 hover:border-slate-300 text-slate-600"
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm">4</span>
                Laboratory Values
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Hemoglobin (g/dL)
                    <span className="text-slate-400 font-normal ml-1">
                      {data.gender === "female" ? "(<12 = anemia)" : data.gender === "male" ? "(<13 = anemia)" : ""}
                    </span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Enter hemoglobin level"
                    value={data.hemoglobin ?? ""}
                    onChange={(e) => updateData({ hemoglobin: e.target.value ? parseFloat(e.target.value) : null })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                  {data.hemoglobin !== null && (
                    <p className={`text-sm mt-1 ${data.gender === "female" ? (data.hemoglobin < 12 ? "text-amber-600" : "text-green-600") : data.gender === "male" ? (data.hemoglobin < 13 ? "text-amber-600" : "text-green-600") : "text-slate-500"}`}>
                      {data.gender === "female" 
                        ? (data.hemoglobin < 12 ? "Anemic (+1 point)" : "Normal")
                        : data.gender === "male"
                        ? (data.hemoglobin < 13 ? "Anemic (+1 point)" : "Normal")
                        : "Select gender to evaluate"}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Serum Albumin (g/dL)
                    <span className="text-slate-400 font-normal ml-1">(&lt;3.5 = low)</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Enter albumin level"
                    value={data.albumin ?? ""}
                    onChange={(e) => updateData({ albumin: e.target.value ? parseFloat(e.target.value) : null })}
                    className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                  {data.albumin !== null && (
                    <p className={`text-sm mt-1 ${data.albumin < 3.5 ? "text-amber-600" : "text-green-600"}`}>
                      {data.albumin < 3.5 ? "Hypoalbuminemia (+1 point)" : "Normal"}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={resetForm}
                className="px-6 py-3 rounded-lg border-2 border-slate-200 hover:border-slate-300 text-slate-600 transition-all"
              >
                Reset Form
              </button>
              <button
                onClick={printResults}
                className="px-6 py-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all"
              >
                Print Results
              </button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-4">
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                  <h2 className="text-white font-semibold text-lg">Results</h2>
                  <p className="text-blue-100 text-sm">1-Year Mortality Risk</p>
                </div>
                <div className="p-6">
                  {!isComplete ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <p className="text-slate-500">Complete all fields to see results</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-sm text-slate-500 mb-1">Frailty Score</p>
                        <div className="text-5xl font-bold text-slate-800">{calculateScore}/6</div>
                      </div>

                      <div className={`p-4 rounded-xl ${riskInfo.bg} border ${riskInfo.border}`}>
                        <p className={`text-center font-semibold ${riskInfo.color}`}>{riskInfo.label}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className={`p-4 rounded-xl border-2 ${data.procedureType === "tavr" ? "border-blue-500 bg-blue-50" : "border-slate-200"}`}>
                          <p className="text-xs text-slate-500 mb-1">TAVR</p>
                          <p className="text-2xl font-bold text-slate-800">{MORTALITY_DATA[calculateScore].tavr}%</p>
                        </div>
                        <div className={`p-4 rounded-xl border-2 ${data.procedureType === "savr" ? "border-blue-500 bg-blue-50" : "border-slate-200"}`}>
                          <p className="text-xs text-slate-500 mb-1">SAVR</p>
                          <p className="text-2xl font-bold text-slate-800">{MORTALITY_DATA[calculateScore].savr}%</p>
                        </div>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-4">
                        <p className="text-sm text-slate-600">
                          Based on selected procedure: <span className="font-semibold">{selectedProcedure.toUpperCase()}</span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-semibold text-slate-800 mb-3">Risk Factors Identified</h3>
                <div className="space-y-2">
                  {[
                    { label: "Chair Stands", active: data.chairStandsUnable, points: data.chairStandsUnable ? 2 : (data.chairStandsTime !== null && data.chairStandsTime > 15 && data.chairStandsTime < 60) ? 1 : 0 },
                    { label: "Cognitive Impairment", active: data.cognitiveImpairment === true, points: data.cognitiveImpairment === true ? 1 : 0 },
                    { label: "Anemia", active: data.hemoglobin !== null && ((data.gender === "female" && data.hemoglobin < 12) || (data.gender === "male" && data.hemoglobin < 13)), points: data.hemoglobin !== null && ((data.gender === "female" && data.hemoglobin < 12) || (data.gender === "male" && data.hemoglobin < 13)) ? 1 : 0 },
                    { label: "Hypoalbuminemia", active: data.albumin !== null && data.albumin < 3.5, points: data.albumin !== null && data.albumin < 3.5 ? 1 : 0 },
                  ].map((factor, i) => (
                    <div key={i} className="flex items-center justify-between py-2">
                      <span className="text-sm text-slate-600">{factor.label}</span>
                      <span className={`text-sm font-medium ${factor.active ? "text-amber-600" : "text-slate-400"}`}>
                        {factor.active ? `+${factor.points}` : "0"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6">
                <h3 className="font-semibold text-blue-800 mb-2">Reference</h3>
                <p className="text-sm text-blue-700 mb-2">
                  Afilalo J, et al. Frailty in Older Adults Undergoing Aortic Valve Replacement: The FRAILTY-AVR Study. JACC 2017.
                </p>
                <p className="text-xs text-blue-600">Harvard Medical School</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <p className="text-center text-sm text-slate-500">
            This calculator is for educational purposes only. Clinical decisions should be made by qualified healthcare professionals.
          </p>
        </div>
      </footer>
    </div>
  );
}
