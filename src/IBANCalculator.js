import React, { useState, useEffect } from "react";
import { Autocomplete, TextField, Card, CardContent, Typography, Box } from "@mui/material";

const countries = {
  AL: { name: "Albania", ibanLength: 28, sepa: "Yes", bankIdLength: 8, flag: "🇦🇱" },
  AD: { name: "Andorra", ibanLength: 24, sepa: "Yes", bankIdLength: 4, flag: "🇦🇩" },
  AT: { name: "Austria", ibanLength: 20, sepa: "Yes", bankIdLength: 5, flag: "🇦🇹" },
  BE: { name: "Belgium", ibanLength: 16, sepa: "Yes", bankIdLength: 3, flag: "🇧🇪" },
  BA: { name: "Bosnia and Herzegovina", ibanLength: 20, sepa: "No", bankIdLength: 3, flag: "🇧🇦" },
  BG: { name: "Bulgaria", ibanLength: 22, sepa: "Yes", bankIdLength: 4, flag: "🇧🇬" },
  BR: { name: "Brazil", ibanLength: 29, sepa: "No", bankIdLength: 8, flag: "🇧🇷" },
  CR: { name: "Costa Rica", ibanLength: 22, sepa: "No", bankIdLength: 4, flag: "🇨🇷" },
  DO: { name: "Dominican Republic", ibanLength: 28, sepa: "No", bankIdLength: 4, flag: "🇩🇴" },
  SV: { name: "El Salvador", ibanLength: 28, sepa: "No", bankIdLength: 4, flag: "🇸🇻" },
  GT: { name: "Guatemala", ibanLength: 28, sepa: "No", bankIdLength: 4, flag: "🇬🇹" },
  HN: { name: "Honduras", ibanLength: 28, sepa: "No", bankIdLength: 4, flag: "🇭🇳" },
  MX: { name: "Mexico", ibanLength: 18, sepa: "No", bankIdLength: 3, flag: "🇲🇽" },
  NI: { name: "Nicaragua", ibanLength: 28, sepa: "No", bankIdLength: 4, flag: "🇳🇮" },
  PY: { name: "Paraguay", ibanLength: 29, sepa: "No", bankIdLength: 4, flag: "🇵🇾" },
  PE: { name: "Peru", ibanLength: 28, sepa: "No", bankIdLength: 4, flag: "🇵🇪" },
  VE: { name: "Venezuela", ibanLength: 28, sepa: "No", bankIdLength: 4, flag: "🇻🇪" },
  SA: { name: "Saudi Arabia", ibanLength: 24, sepa: "No", bankIdLength: 2, flag: "🇸🇦" },
  AE: { name: "United Arab Emirates", ibanLength: 23, sepa: "No", bankIdLength: 3, flag: "🇦🇪" },
  QA: { name: "Qatar", ibanLength: 29, sepa: "No", bankIdLength: 4, flag: "🇶🇦" },
  KW: { name: "Kuwait", ibanLength: 30, sepa: "No", bankIdLength: 4, flag: "🇰🇼" },
  JO: { name: "Jordan", ibanLength: 30, sepa: "No", bankIdLength: 4, flag: "🇯🇴" },
};

const IBANCalculator = () => {
  const [country, setCountry] = useState(null);
  const [ibanDetails, setIbanDetails] = useState(null);

  useEffect(() => {
    if (country) {
      setIbanDetails(generateIBAN(country));
    } else {
      setIbanDetails(null);
    }
  }, [country]);

  const generateIBAN = (countryCode) => {
    if (!countryCode) return null;
    const country = countries[countryCode];
    if (!country) return null;
    
    const checkDigits = Math.floor(10 + Math.random() * 89).toString();
    const bankIdentifier = Math.random().toString().slice(2, 2 + country.bankIdLength);
    const accountNumber = Math.random().toString().slice(2, country.ibanLength - country.bankIdLength - 4);
    const bban = `${bankIdentifier} ${accountNumber}`;
    const formattedIBAN = `${countryCode}${checkDigits} ${bban.replace(/(.{4})/g, "$1 ")}`.trim();
    
    return { formattedIBAN, checkDigits, bban, bankIdentifier, accountNumber };
  };

  return (
    <Card sx={{ maxWidth: 500, mx: "auto", mt: 5, p: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          IBAN Calculator
        </Typography>
        <Autocomplete
          options={Object.keys(countries)}
          getOptionLabel={(option) => `${countries[option].flag} ${countries[option].name} (${option})`}
          renderOption={(props, option) => (
            <Box component="li" {...props} display="flex" alignItems="center">
              <Typography sx={{ mr: 1 }}>{countries[option].flag}</Typography>
              <Typography>{countries[option].name} ({option})</Typography>
            </Box>
          )}
          value={country || null}
          onChange={(event, newValue) => setCountry(newValue || null)}
          renderInput={(params) => <TextField {...params} label="Select a Country" variant="outlined" fullWidth />}
        />
        {ibanDetails && (
          <Card sx={{ mt: 3, p: 2 }}>
            <Typography variant="h6">Your IBAN Number</Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold", mt: 1 }}>{ibanDetails.formattedIBAN}</Typography>
            <Typography variant="body2">ISO Country Code: {country}</Typography>
            <Typography variant="body2">IBAN Check Digits: {ibanDetails.checkDigits}</Typography>
            <Typography variant="body2">BBAN: {ibanDetails.bban}</Typography>
            <Typography variant="body2">Bank Identifier: {ibanDetails.bankIdentifier}</Typography>
            <Typography variant="body2">Account Number: {ibanDetails.accountNumber}</Typography>
            <Typography variant="body2">SEPA Member: {countries[country]?.sepa}</Typography>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default IBANCalculator;
