import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme"); // Import defaultTheme

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // Path to Tremor node module
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
      fontFamily: { // Add fontFamily
        sans: ["var(--font-inter)", ...fontFamily.sans], // Use Inter as default sans-serif
        serif: ["var(--font-playfair-display)", ...fontFamily.serif], // Use Playfair Display as default serif
        manrope: ["var(--font-manrope)"], // Keep Manrope available if needed elsewhere
        mono: ["var(--font-mono)", ...fontFamily.mono], // Add monospace font family
      },
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
        // Add deep red/cyan accents if needed, or use existing theme colors
        // 'deep-red': '#B91C1C', // Example deep red
        // 'cyan-highlight': '#0891B2', // Example cyan
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			},
          // Tremor specific colors - map to our theme
         tremor: {
            brand: {
              faint: 'hsl(var(--accent) / 0.2)',
              muted: 'hsl(var(--muted))',
              subtle: 'hsl(var(--secondary))',
              DEFAULT: 'hsl(var(--primary))',
              emphasis: 'hsl(var(--primary) / 0.8)',
              inverted: 'hsl(var(--primary-foreground))',
            },
            background: {
              muted: 'hsl(var(--muted) / 0.5)',
              subtle: 'hsl(var(--background))',
              DEFAULT: 'hsl(var(--background))',
              emphasis: 'hsl(var(--card))',
            },
            border: {
              DEFAULT: 'hsl(var(--border))',
            },
            ring: {
              DEFAULT: 'hsl(var(--ring))',
            },
            content: {
              subtle: 'hsl(var(--muted-foreground))',
              DEFAULT: 'hsl(var(--foreground))',
              emphasis: 'hsl(var(--foreground) / 0.9)',
              strong: 'hsl(var(--foreground))',
              inverted: 'hsl(var(--background))',
            },
         },
          // dark mode tremor colors
         'dark-tremor': {
            brand: {
              faint: 'hsl(var(--accent) / 0.2)', // Use dark accent
              muted: 'hsl(var(--muted))', // Dark muted
              subtle: 'hsl(var(--secondary))', // Dark secondary
              DEFAULT: 'hsl(var(--primary))', // Dark primary
              emphasis: 'hsl(var(--primary) / 0.8)',
              inverted: 'hsl(var(--primary-foreground))', // Dark primary foreground
            },
            background: {
               muted: 'hsl(var(--muted) / 0.5)', // Dark muted
               subtle: 'hsl(var(--background))', // Dark background
               DEFAULT: 'hsl(var(--background))', // Dark background
               emphasis: 'hsl(var(--card))', // Dark card
            },
            border: {
              DEFAULT: 'hsl(var(--border))', // Dark border
            },
            ring: {
              DEFAULT: 'hsl(var(--ring))', // Dark ring
            },
            content: {
              subtle: 'hsl(var(--muted-foreground))', // Dark muted foreground
              DEFAULT: 'hsl(var(--foreground))', // Dark foreground
              emphasis: 'hsl(var(--foreground) / 0.9)',
              strong: 'hsl(var(--foreground))',
              inverted: 'hsl(var(--background))', // Dark background
            },
         },
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
            tremor: {
                small: 'calc(var(--radius) - 4px)',
                default: 'var(--radius)',
                large: 'calc(var(--radius) + 2px)',
                full: '9999px',
            },
  		},
       boxShadow: {
            // tremor shadows
            'tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
            'tremor-card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
            'tremor-dropdown': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
             // dark mode tremor shadows
            'dark-tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
            'dark-tremor-card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
            'dark-tremor-dropdown': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        },
        fontSize: {
            'tremor-label': ['0.75rem', { lineHeight: '1rem' }],
            'tremor-default': ['0.875rem', { lineHeight: '1.25rem' }],
            'tremor-title': ['1.125rem', { lineHeight: '1.75rem' }],
            'tremor-metric': ['1.875rem', { lineHeight: '2.25rem' }],
        },
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
        // Add subtle fade-in animation
        'fade-in': {
          '0%': { opacity: '0' , transform: 'translateY(8px)'}, // Start slightly down and transparent
          '100%': { opacity: '1', transform: 'translateY(0)' }, // End fully visible and in place
        },
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-out forwards', // Apply fade-in, slightly quicker
  		}
  	}
  },
   safelist: [ // Required by Tremor
        {
            pattern: /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
            variants: ['hover', 'ui-selected'],
        },
        {
            pattern: /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
            variants: ['hover', 'ui-selected'],
        },
        {
            pattern: /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
            variants: ['hover', 'ui-selected'],
        },
        {
            pattern: /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
        },
        {
            pattern: /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
        },
        {
            pattern: /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
        },
    ],
  plugins: [require("tailwindcss-animate"), require('@tailwindcss/typography')],
} satisfies Config;
