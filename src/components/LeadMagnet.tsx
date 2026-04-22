'use client';

export default function LeadMagnet() {
  return (
    <section id="lead-magnet" className="bg-bg-ice py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Text */}
          <div className="text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary-navy mb-4">
              Not Sure What Documents You Need?
            </h2>
            <p className="text-lg text-text-muted leading-relaxed mb-6">
              Download our exclusive 2026 GACC Decree 248 Master Checklist.
              This comprehensive guide covers everything you need for successful registration.
            </p>
            <div className="hidden lg:block">
              <p className="text-sm text-text-muted">
                ✓ Complete document list<br />
                ✓ Timeline expectations<br />
                ✓ Common pitfalls to avoid
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="w-full">
            <form
              action="https://api.web3forms.com/submit"
              method="POST"
              className="w-full max-w-md mx-auto bg-white rounded-lg p-6 sm:p-8 shadow-lg"
            >
              <input
                type="hidden"
                name="access_key"
                value="b1e6d34d-9fdc-4dc1-9bb2-6fc9090b361c"
              />
              <input
                type="hidden"
                name="subject"
                value="🔥 New Lead: GACC Checklist Download!"
              />
              <input
                type="hidden"
                name="from_name"
                value="SinoTrade Website"
              />
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                style={{ display: 'none' }}
              />
              <input
                type="hidden"
                name="redirect"
                value="https://www.sinotradecompliance.com/thank-you"
              />

              {/* Name Input */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-text-charcoal mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="e.g. Michael Scott"
                  required
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-navy focus:border-transparent transition-all shadow-sm"
                />
              </div>

              {/* Email Input */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-text-charcoal mb-1"
                >
                  Business Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="michael@company.com"
                  required
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-navy focus:border-transparent transition-all shadow-sm"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-2 bg-primary-navy hover:bg-primary-navy/90 text-white font-bold py-3.5 px-4 rounded-md transition-colors duration-300 shadow-md flex justify-center items-center gap-2"
              >
                Download Free Checklist →
              </button>

              {/* Privacy Notice */}
              <p className="text-xs text-text-muted text-center mt-3">
                We respect your privacy. No spam, ever.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}