import type { FC } from 'react';
import { useBudgetViewModel } from '../../viewmodels/useBudgetViewModel';

export const BudgetSection: FC = () => {
  const { form, result, handleChange, submitToWhatsApp } = useBudgetViewModel();

  return (
    <section className="budget-section" id="orcamento" data-reveal>
      <div className="budget-card">
        {/* Form side */}
        <div className="budget-card__body">
          <div className="budget-card__label">— Orçamento sob medida</div>
          <h2 className="budget-card__title">
            Faça uma estimativa <em>agora</em>.
          </h2>
          <p className="budget-card__intro">
            Preencha as dimensões aproximadas e a gente devolve uma faixa de
            investimento em tempo real.
          </p>

          <div className="b-form">
            <div className="b-row">
              <div className="b-field">
                <label htmlFor="tipo">Tipo de peça</label>
                <select
                  id="tipo"
                  name="tipo"
                  value={form.tipo}
                  onChange={handleChange}
                >
                  <option value="mobiliario">
                    Mobiliário (cristaleira, aparador, mesa)
                  </option>
                  <option value="sagrada">
                    Sagrada (cruz, oratório, suporte)
                  </option>
                  <option value="decoracao">
                    Decoração (porta-vinhos, miniatura)
                  </option>
                  <option value="sazonal">Sazonal (árvore, presépio)</option>
                </select>
              </div>

              <div className="b-field">
                <label htmlFor="madeira">Madeira</label>
                <select
                  id="madeira"
                  name="madeira"
                  value={form.madeira}
                  onChange={handleChange}
                >
                  <option value="imbuia">Imbuia</option>
                  <option value="cedro">Cedro rosa</option>
                  <option value="peroba">Peroba escura</option>
                  <option value="itauba">Itaúba</option>
                  <option value="jequitiba">Jequitibá</option>
                </select>
              </div>
            </div>

            <div className="b-row b-row--3">
              <div className="b-field">
                <label htmlFor="largura">Largura (cm)</label>
                <input
                  type="number"
                  id="largura"
                  name="largura"
                  min={10}
                  max={400}
                  value={form.largura}
                  onChange={handleChange}
                />
              </div>
              <div className="b-field">
                <label htmlFor="profundidade">Profundidade (cm)</label>
                <input
                  type="number"
                  id="profundidade"
                  name="profundidade"
                  min={10}
                  max={200}
                  value={form.profundidade}
                  onChange={handleChange}
                />
              </div>
              <div className="b-field">
                <label htmlFor="altura">Altura (cm)</label>
                <input
                  type="number"
                  id="altura"
                  name="altura"
                  min={10}
                  max={300}
                  value={form.altura}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="b-row">
              <div className="b-field">
                <label htmlFor="acabamento">Acabamento</label>
                <select
                  id="acabamento"
                  name="acabamento"
                  value={form.acabamento}
                  onChange={handleChange}
                >
                  <option value="cera">Cera de carnaúba</option>
                  <option value="verniz">Verniz fosco</option>
                  <option value="stain">Stain escuro</option>
                </select>
              </div>

              <div className="b-field">
                <label htmlFor="urgencia">Urgência</label>
                <select
                  id="urgencia"
                  name="urgencia"
                  value={form.urgencia}
                  onChange={handleChange}
                >
                  <option value="padrao">Padrão (prazo normal)</option>
                  <option value="expressa">Expressa (+30%)</option>
                </select>
              </div>
            </div>

            <div className="b-actions">
              <button
                type="button"
                className="btn btn--yellow"
                onClick={submitToWhatsApp}
              >
                Enviar pedido pelo WhatsApp →
              </button>
            </div>
          </div>
        </div>

        {/* Result side */}
        <div className="budget-card__side">
          <div>
            <div className="budget-side__meta">— Estimativa em tempo real</div>
            <div className="budget-side__range">
              <span>{result.min}</span> <b>até</b> <span>{result.max}</span>
              <small>
                Faixa de investimento estimada · valor final depende da madeira
                escolhida e dos detalhes do projeto.
              </small>
            </div>
            <div className="budget-side__prazo">
              <div className="budget-side__prazo-k">Prazo estimado</div>
              <div className="budget-side__prazo-v">{result.prazo}</div>
            </div>
          </div>
          <div className="budget-side__foot">
            Estimativa indicativa · não é uma cotação fechada. Após enviar,
            retornamos em até 48h com uma proposta detalhada por escrito.
          </div>
        </div>
      </div>
    </section>
  );
};
