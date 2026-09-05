import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { quotationPolicies } from "../../../Data/quotationPolicies";

const PAGE = {
  width: 595.28,
  height: 841.89,
};

const MARGIN = {
  left: 42,
  right: 42,
  top: 46,
  bottom: 42,
};

const COLORS = {
  orange: [246, 76, 28],
  orangeLight: [255, 244, 239],
  dark: [42, 42, 42],
  text: [72, 72, 72],
  muted: [125, 125, 125],
  border: [228, 228, 228],
  light: [247, 247, 247],
  blueLight: [235, 247, 253],
  blue: [26, 110, 145],
  greenLight: [235, 248, 239],
  green: [35, 125, 66],
  redLight: [255, 237, 239],
  red: [180, 42, 55],
  white: [255, 255, 255],
};

function money(value) {
  return `INR ${Number(value || 0).toLocaleString("en-IN")}`;
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve(null);
      return;
    }

    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}

function addPageNumber(doc, pageNumber) {
  const y = PAGE.height - 24;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...COLORS.muted);

  doc.text(
    "PrimeVistaJourney  |  Travel Beyond Horizons",
    MARGIN.left,
    y
  );

  doc.text(
    `Page ${pageNumber}`,
    PAGE.width - MARGIN.right,
    y,
    {
      align: "right",
    }
  );
}

function addTopBar(doc) {
  doc.setFillColor(...COLORS.orange);

  doc.rect(
    0,
    0,
    PAGE.width,
    24,
    "F"
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.white);

  doc.text(
    "Perfect Itinerary for your trip!",
    PAGE.width / 2,
    16,
    {
      align: "center",
    }
  );
}

function addSectionTitle(doc, title, y = 55) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(...COLORS.dark);

  doc.text(title, MARGIN.left, y);

  doc.setDrawColor(...COLORS.orange);
  doc.setLineWidth(1.5);

  doc.line(
    MARGIN.left,
    y + 9,
    MARGIN.left + 145,
    y + 9
  );

  return y + 35;
}

function addBrandLogo(doc, logo) {
  if (logo) {
    try {
      doc.addImage(
        logo,
        "PNG",
        MARGIN.left,
        36,
        125,
        34
      );

      return;
    } catch {}
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(...COLORS.orange);

  doc.text(
    "PrimeVistaJourney",
    MARGIN.left,
    58
  );
}

function addIconCircle(
  doc,
  x,
  y,
  text,
  background = COLORS.orangeLight,
  foreground = COLORS.orange
) {
  doc.setFillColor(...background);

  doc.circle(
    x,
    y,
    12,
    "F"
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...foreground);

  doc.text(
    text,
    x,
    y + 3,
    {
      align: "center",
    }
  );
}

function addInfoRow(
  doc,
  x,
  y,
  icon,
  label,
  value
) {
  addIconCircle(
    doc,
    x + 10,
    y,
    icon
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...COLORS.muted);

  doc.text(
    label.toUpperCase(),
    x + 29,
    y - 2
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(...COLORS.dark);

  doc.text(
    value || "-",
    x + 29,
    y + 10
  );
}

function addMealPill(
  doc,
  x,
  y,
  label,
  value,
  included
) {
  const width = 155;

  const bg = included
    ? COLORS.greenLight
    : COLORS.light;

  const fg = included
    ? COLORS.green
    : COLORS.muted;

  doc.setFillColor(...bg);

  doc.roundedRect(
    x,
    y,
    width,
    24,
    5,
    5,
    "F"
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);

  doc.setTextColor(...fg);

  doc.text(
    label,
    x + 10,
    y + 15
  );

  doc.setFont("helvetica", "normal");

  doc.text(
    value,
    x + width - 10,
    y + 15,
    {
      align: "right",
    }
  );
}

function estimateTextHeight(
  doc,
  text,
  width,
  fontSize = 9,
  lineHeight = 4.8
) {
  doc.setFontSize(fontSize);

  const lines = doc.splitTextToSize(
    text || "",
    width
  );

  return lines.length * lineHeight;
}

function addParagraph(
  doc,
  text,
  y,
  options = {}
) {
  const {
    width = PAGE.width - MARGIN.left - MARGIN.right,
    fontSize = 9,
    lineHeight = 4.8,
    color = COLORS.text,
    bottomSpace = 8,
  } = options;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(fontSize);
  doc.setTextColor(...color);

  const lines = doc.splitTextToSize(
    text || "",
    width
  );

  doc.text(
    lines,
    MARGIN.left,
    y
  );

  return (
    y +
    lines.length * lineHeight +
    bottomSpace
  );
}

function getRemainingHeight(y) {
  return PAGE.height - MARGIN.bottom - y;
}

function ensureSpace(
  doc,
  y,
  requiredHeight,
  sectionTitle = null
) {
  if (
    getRemainingHeight(y) <
    requiredHeight
  ) {
    doc.addPage();

    const page =
      doc.internal.getNumberOfPages();

    addPageNumber(doc, page);

    if (sectionTitle) {
      y = addSectionTitle(
        doc,
        sectionTitle
      );
    } else {
      y = MARGIN.top;
    }

    return y;
  }

  return y;
}

/*
|--------------------------------------------------------------------------
| COVER
|--------------------------------------------------------------------------
*/

function createCoverPage(
  doc,
  data,
  logo,
  coverImage
) {
  addTopBar(doc);

  addBrandLogo(doc, logo);

  /*
   * Cover image
   */

  if (coverImage) {
    try {
      doc.addImage(
        coverImage,
        "JPEG",
        0,
        86,
        PAGE.width,
        355
      );
    } catch {
      drawCoverPlaceholder(doc);
    }
  } else {
    drawCoverPlaceholder(doc);
  }

  /*
   * Cover overlay
   */

  doc.setFillColor(0, 0, 0, 0.18);

  /*
   * Main cover title
   */

  doc.setFont("helvetica", "normal");
  doc.setFontSize(38);
  doc.setTextColor(...COLORS.orange);

  doc.text(
    data.cover?.title || "6 days in",
    PAGE.width / 2,
    315,
    {
      align: "center",
    }
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(35);
  doc.setTextColor(...COLORS.white);

  doc.text(
    data.cover?.destination ||
      data.quotation.destination,
    PAGE.width / 2,
    365,
    {
      align: "center",
    }
  );

  /*
   * Customer heading
   */

  let y = 480;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(17);
  doc.setTextColor(...COLORS.dark);

  doc.text(
    `${data.customer?.name || "Customer"}'s`,
    MARGIN.left,
    y
  );

  const nameWidth = doc.getTextWidth(
    `${data.customer?.name || "Customer"}'s`
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);

  doc.text(
    `${data.quotation?.duration || ""} trip to`,
    MARGIN.left + nameWidth + 8,
    y
  );

  y += 30;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(29);
  doc.setTextColor(...COLORS.orange);

  doc.text(
    data.quotation?.destination ||
      "Thailand",
    MARGIN.left,
    y
  );

  /*
   * Trip information
   */

  y += 30;

  autoTable(doc, {
    startY: y,

    margin: {
      left: MARGIN.left,
      right: MARGIN.right,
    },

    body: [
      [
        "DEPARTURE",
        data.quotation?.departureDate || "-",
      ],
      [
        "DURATION",
        data.quotation?.duration || "-",
      ],
      [
        "TRAVELLERS",
        data.quotation?.travellers || "-",
      ],
      [
        "INCLUSIONS",
        (
          data.inclusionsTags || []
        ).join("     "),
      ],
    ],

    theme: "plain",

    styles: {
      font: "helvetica",
      fontSize: 8.5,
      textColor: COLORS.text,
      cellPadding: 7,
      lineColor: COLORS.border,
      lineWidth: 0.5,
    },

    columnStyles: {
      0: {
        cellWidth: 150,
        fontStyle: "bold",
      },

      1: {
        cellWidth: 360,
      },
    },

    alternateRowStyles: {
      fillColor: COLORS.light,
    },
  });

  /*
   * Consultant card
   */

  y = doc.lastAutoTable.finalY + 12;

  doc.setFillColor(...COLORS.orangeLight);

  doc.roundedRect(
    MARGIN.left,
    y,
    PAGE.width -
      MARGIN.left -
      MARGIN.right,
    75,
    7,
    7,
    "F"
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.dark);

  doc.text(
    "CURATED BY",
    MARGIN.left + 10,
    y + 15
  );

  doc.setFontSize(13);

  doc.text(
    data.quotation?.consultant ||
      "PrimeVista Journey",
    MARGIN.left + 80,
    y + 26
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);

  doc.text(
    `Call: ${
      data.quotation?.consultantPhone ||
      "+91 81784 20122"
    }`,
    MARGIN.left + 80,
    y + 42
  );

  doc.text(
    `Email: ${
      data.quotation?.consultantEmail ||
      "info@primevistajourney.com"
    }`,
    MARGIN.left + 80,
    y + 55
  );

  doc.text(
    `Quotation Created on ${
      data.quotation?.quotationDate || "-"
    }`,
    PAGE.width - MARGIN.right - 10,
    y + 55,
    {
      align: "right",
    }
  );
}

function drawCoverPlaceholder(doc) {
  doc.setFillColor(60, 30, 55);

  doc.rect(
    0,
    86,
    PAGE.width,
    355,
    "F"
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(32);
  doc.setTextColor(...COLORS.white);

  doc.text(
    "YOUR JOURNEY",
    PAGE.width / 2,
    250,
    {
      align: "center",
    }
  );
}

/*
|--------------------------------------------------------------------------
| STAYS
|--------------------------------------------------------------------------
*/

function createStaysPage(
  doc,
  data
) {
  doc.addPage();

  let y = addSectionTitle(
    doc,
    "STAYS"
  );

  (data.stays || []).forEach(
    (hotel) => {
      const hotelHeight =
        138;

      y = ensureSpace(
        doc,
        y,
        hotelHeight,
        "STAYS"
      );

      doc.setFillColor(
        ...COLORS.light
      );

      doc.roundedRect(
        MARGIN.left,
        y,
        PAGE.width -
          MARGIN.left -
          MARGIN.right,
        115,
        6,
        6,
        "F"
      );

      /*
       * Hotel icon
       */

      addIconCircle(
        doc,
        MARGIN.left + 18,
        y + 20,
        "H"
      );

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setFontSize(16);

      doc.setTextColor(
        ...COLORS.dark
      );

      doc.text(
        hotel.hotel || "Hotel",
        MARGIN.left + 38,
        y + 25
      );

      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.setFontSize(9);

      doc.setTextColor(
        ...COLORS.text
      );

      doc.text(
        hotel.city || "",
        MARGIN.left + 38,
        y + 40
      );

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setFontSize(8);

      doc.setTextColor(
        ...COLORS.orange
      );

      doc.text(
        hotel.category || "",
        MARGIN.left + 38,
        y + 54
      );

      doc.setTextColor(
        ...COLORS.dark
      );

      doc.text(
        `Check-In: ${hotel.checkIn || "-"}  |  Check-Out: ${hotel.checkOut || "-"}`,
        MARGIN.left + 38,
        y + 68
      );

      /*
       * Room cards
       */

      let roomY =
        y + 78;

      (hotel.rooms || []).forEach(
        (room) => {
          doc.setFillColor(
            ...COLORS.blueLight
          );

          doc.roundedRect(
            MARGIN.left + 12,
            roomY,
            PAGE.width -
              MARGIN.left -
              MARGIN.right -
              24,
            45,
            5,
            5,
            "F"
          );

          addIconCircle(
            doc,
            MARGIN.left + 27,
            roomY + 22,
            "R",
            COLORS.white,
            COLORS.blue
          );

          doc.setFont(
            "helvetica",
            "bold"
          );

          doc.setFontSize(8);

          doc.setTextColor(
            ...COLORS.blue
          );

          doc.text(
            room.room || "Room",
            MARGIN.left + 45,
            roomY + 15
          );

          doc.setFont(
            "helvetica",
            "normal"
          );

          doc.setFontSize(8);

          doc.setTextColor(
            ...COLORS.dark
          );

          doc.text(
            room.type || "-",
            MARGIN.left + 45,
            roomY + 28
          );

          doc.text(
            room.adults || "-",
            MARGIN.left + 45,
            roomY + 40
          );

          roomY += 50;
        }
      );

      y += 125;
    }
  );

  /*
   * Availability note
   */

  y = ensureSpace(
    doc,
    y,
    40,
    "STAYS"
  );

  doc.setFillColor(
    ...COLORS.redLight
  );

  doc.roundedRect(
    MARGIN.left,
    y,
    PAGE.width -
      MARGIN.left -
      MARGIN.right,
    32,
    4,
    4,
    "F"
  );

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(8);

  doc.setTextColor(
    ...COLORS.red
  );

  doc.text(
    "NOTE",
    MARGIN.left + 10,
    y + 20
  );

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.text(
    "Rooms and rates are subject to availability.",
    MARGIN.left + 45,
    y + 20
  );
}

/*
|--------------------------------------------------------------------------
| FLIGHTS
|--------------------------------------------------------------------------
*/

function createFlightsPage(
  doc,
  data
) {
  doc.addPage();

  let y = addSectionTitle(
    doc,
    "FLIGHTS"
  );

  const flights =
    data.flights || [];

  const hasFlightData =
    flights.some(
      (flight) =>
        flight.airline ||
        flight.flightNumber ||
        flight.from ||
        flight.to
    );

  if (hasFlightData) {
    autoTable(doc, {
      startY: y,

      margin: {
        left: MARGIN.left,
        right: MARGIN.right,
      },

      head: [
        [
          "AIRLINE",
          "FLIGHT",
          "FROM",
          "TO",
          "DEPARTURE",
          "ARRIVAL",
        ],
      ],

      body: flights.map(
        (flight) => [
          flight.airline || "-",
          flight.flightNumber || "-",
          flight.from || "-",
          flight.to || "-",
          flight.departure || "-",
          flight.arrival || "-",
        ]
      ),

      theme: "plain",

      styles: {
        font: "helvetica",
        fontSize: 8,
        cellPadding: 9,
        textColor: COLORS.dark,
        lineColor: COLORS.border,
        lineWidth: 0.5,
      },

      headStyles: {
        fillColor: COLORS.orange,
        textColor: COLORS.white,
        fontStyle: "bold",
        fontSize: 7,
      },

      alternateRowStyles: {
        fillColor: COLORS.light,
      },
    });

    y =
      doc.lastAutoTable.finalY +
      20;
  } else {
    doc.setFillColor(
      ...COLORS.light
    );

    doc.roundedRect(
      MARGIN.left,
      y,
      PAGE.width -
        MARGIN.left -
        MARGIN.right,
      70,
      6,
      6,
      "F"
    );

    addIconCircle(
      doc,
      MARGIN.left + 25,
      y + 35,
      "✈"
    );

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(12);

    doc.setTextColor(
      ...COLORS.dark
    );

    doc.text(
      "Flight details will be added to the quotation.",
      MARGIN.left + 48,
      y + 32
    );

    y += 90;
  }

  doc.setFillColor(
    ...COLORS.redLight
  );

  doc.roundedRect(
    MARGIN.left,
    y,
    PAGE.width -
      MARGIN.left -
      MARGIN.right,
    32,
    4,
    4,
    "F"
  );

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(8);

  doc.setTextColor(
    ...COLORS.red
  );

  doc.text(
    "NOTE",
    MARGIN.left + 10,
    y + 20
  );

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.text(
    "Prices are dynamic and can change at any point of time.",
    MARGIN.left + 45,
    y + 20
  );
}

/*
|--------------------------------------------------------------------------
| ITINERARY
|--------------------------------------------------------------------------
*/

function addItineraryCard(
  doc,
  item,
  y
) {
  const cardX =
    MARGIN.left;

  const cardWidth =
    PAGE.width -
    MARGIN.left -
    MARGIN.right;

  /*
   * Calculate height
   */

  const descriptionHeight =
    estimateTextHeight(
      doc,
      item.description,
      cardWidth - 85,
      8.7,
      4.8
    );

  const cardHeight =
    Math.max(
      128,
      94 + descriptionHeight
    );

  /*
   * Card
   */

  doc.setFillColor(
    ...COLORS.white
  );

  doc.setDrawColor(
    ...COLORS.border
  );

  doc.setLineWidth(0.6);

  doc.roundedRect(
    cardX,
    y,
    cardWidth,
    cardHeight,
    7,
    7,
    "FD"
  );

  /*
   * Day badge
   */

  doc.setFillColor(
    ...COLORS.orange
  );

  doc.roundedRect(
    cardX + 12,
    y + 14,
    58,
    50,
    6,
    6,
    "F"
  );

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(16);

  doc.setTextColor(
    ...COLORS.white
  );

  const dayNumber =
    String(
      item.day ||
        ""
    ).replace(
      /[^0-9]/g,
      ""
    ) || "1";

  doc.text(
    dayNumber.padStart(2, "0"),
    cardX + 41,
    y + 38,
    {
      align: "center",
    }
  );

  doc.setFontSize(7);

  doc.text(
    "DAY",
    cardX + 41,
    y + 52,
    {
      align: "center",
    }
  );

  /*
   * Date
   */

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(8);

  doc.setTextColor(
    ...COLORS.orange
  );

  doc.text(
    item.date || "",
    cardX + 82,
    y + 22
  );

  /*
   * Title
   */

  doc.setFontSize(13);

  doc.setTextColor(
    ...COLORS.dark
  );

  const titleLines =
    doc.splitTextToSize(
      item.title || "",
      cardWidth - 100
    );

  doc.text(
    titleLines,
    cardX + 82,
    y + 39
  );

  const titleHeight =
    titleLines.length * 15;

  /*
   * Divider
   */

  const dividerY =
    y + 50 + titleHeight;

  doc.setDrawColor(
    ...COLORS.border
  );

  doc.line(
    cardX + 82,
    dividerY,
    cardX + cardWidth - 15,
    dividerY
  );

  /*
   * Description
   */

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.setFontSize(8.7);

  doc.setTextColor(
    ...COLORS.text
  );

  const descriptionLines =
    doc.splitTextToSize(
      item.description || "",
      cardWidth - 100
    );

  doc.text(
    descriptionLines,
    cardX + 82,
    dividerY + 17
  );

  /*
   * Meal pills
   */

  const mealY =
    dividerY +
    descriptionLines.length * 4.8 +
    13;

  const mealWidth =
    (cardWidth - 100 - 20) /
    3;

  addMealPill(
    doc,
    cardX + 82,
    mealY,
    "BREAKFAST",
    item.breakfast ||
      "Not Included",
    String(
      item.breakfast
    ).toLowerCase() ===
      "included"
  );

  addMealPill(
    doc,
    cardX + 82 + mealWidth + 10,
    mealY,
    "LUNCH",
    item.lunch ||
      "Not Included",
    String(
      item.lunch
    ).toLowerCase() ===
      "included"
  );

  addMealPill(
    doc,
    cardX + 82 + (mealWidth + 10) * 2,
    mealY,
    "DINNER",
    item.dinner ||
      "Not Included",
    String(
      item.dinner
    ).toLowerCase() ===
      "included"
  );

  return cardHeight;
}

function createItineraryPages(
  doc,
  data
) {
  doc.addPage();

  let y = addSectionTitle(
    doc,
    "ITINERARY"
  );

  const itinerary =
    data.itinerary || [];

  itinerary.forEach(
    (item, index) => {
      /*
       * Estimate before adding.
       */

      const descriptionHeight =
        estimateTextHeight(
          doc,
          item.description,
          410,
          8.7,
          4.8
        );

      const requiredHeight =
        Math.max(
          128,
          94 + descriptionHeight
        ) + 14;

      /*
       * If not enough space,
       * continue on next page.
       */

      if (
        getRemainingHeight(y) <
        requiredHeight
      ) {
        doc.addPage();

        const page =
          doc.internal.getNumberOfPages();

        addPageNumber(
          doc,
          page
        );

        y = addSectionTitle(
          doc,
          "ITINERARY"
        );
      }

      const height =
        addItineraryCard(
          doc,
          item,
          y
        );

      y += height + 14;
    }
  );
}

/*
|--------------------------------------------------------------------------
| INCLUSIONS / EXCLUSIONS
|--------------------------------------------------------------------------
*/

function createInclusionsPage(
  doc,
  data
) {
  doc.addPage();

  let y = addSectionTitle(
    doc,
    "INCLUSIONS & EXCLUSIONS"
  );

  const columnWidth =
    (
      PAGE.width -
      MARGIN.left -
      MARGIN.right -
      18
    ) / 2;

  /*
   * Inclusions
   */

  doc.setFillColor(
    ...COLORS.greenLight
  );

  doc.roundedRect(
    MARGIN.left,
    y,
    columnWidth,
    35,
    6,
    6,
    "F"
  );

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(13);

  doc.setTextColor(
    ...COLORS.green
  );

  doc.text(
    "Inclusions",
    MARGIN.left + 14,
    y + 23
  );

  let leftY =
    y + 50;

  (data.inclusions || []).forEach(
    (item) => {
      doc.setFillColor(
        ...COLORS.green
      );

      doc.circle(
        MARGIN.left + 7,
        leftY - 3,
        2.5,
        "F"
      );

      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.setFontSize(8.5);

      doc.setTextColor(
        ...COLORS.text
      );

      const lines =
        doc.splitTextToSize(
          item,
          columnWidth - 25
        );

      doc.text(
        lines,
        MARGIN.left + 17,
        leftY
      );

      leftY +=
        lines.length * 5 +
        9;
    }
  );

  /*
   * Exclusions
   */

  const rightX =
    MARGIN.left +
    columnWidth +
    18;

  doc.setFillColor(
    ...COLORS.redLight
  );

  doc.roundedRect(
    rightX,
    y,
    columnWidth,
    35,
    6,
    6,
    "F"
  );

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(13);

  doc.setTextColor(
    ...COLORS.red
  );

  doc.text(
    "Exclusions",
    rightX + 14,
    y + 23
  );

  let rightY =
    y + 50;

  (data.exclusions || []).forEach(
    (item) => {
      doc.setFillColor(
        ...COLORS.red
      );

      doc.circle(
        rightX + 7,
        rightY - 3,
        2.5,
        "F"
      );

      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.setFontSize(8.5);

      doc.setTextColor(
        ...COLORS.text
      );

      const lines =
        doc.splitTextToSize(
          item,
          columnWidth - 25
        );

      doc.text(
        lines,
        rightX + 17,
        rightY
      );

      rightY +=
        lines.length * 5 +
        9;
    }
  );
}

/*
|--------------------------------------------------------------------------
| FARE SUMMARY
|--------------------------------------------------------------------------
*/

function createFarePage(
  doc,
  data
) {
  doc.addPage();

  let y = addSectionTitle(
    doc,
    "FARE SUMMARY"
  );

  const packageTotal =
    Number(
      data.pricing?.packageTotal || 0
    );

  const flightTotal =
    Number(
      data.pricing?.flightTotal || 0
    );

  const grandTotal =
    packageTotal +
    flightTotal;

  /*
   * Package card
   */

  addFareCard(
    doc,
    MARGIN.left,
    y,
    "PACKAGE",
    data.pricing?.packageTravellers,
    data.pricing?.packagePerAdult,
    packageTotal
  );

  y += 145;

  /*
   * Flight card
   */

  addFareCard(
    doc,
    MARGIN.left,
    y,
    "FLIGHTS",
    data.pricing?.flightTravellers,
    data.pricing?.flightPerAdult,
    flightTotal
  );

  y += 145;

  /*
   * Grand total
   */

  doc.setFillColor(
    ...COLORS.orange
  );

  doc.roundedRect(
    MARGIN.left,
    y,
    PAGE.width -
      MARGIN.left -
      MARGIN.right,
    82,
    8,
    8,
    "F"
  );

  doc.setTextColor(
    ...COLORS.white
  );

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(12);

  doc.text(
    "TOTAL QUOTATION VALUE",
    MARGIN.left + 18,
    y + 29
  );

  doc.setFontSize(25);

  doc.text(
    money(grandTotal),
    PAGE.width - MARGIN.right - 18,
    y + 43,
    {
      align: "right",
    }
  );

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.setFontSize(8);

  doc.text(
    "Package + Flight",
    MARGIN.left + 18,
    y + 52
  );
}

function addFareCard(
  doc,
  x,
  y,
  title,
  travellers,
  perAdult,
  total
) {
  const width =
    PAGE.width -
    MARGIN.left -
    MARGIN.right;

  doc.setFillColor(
    ...COLORS.light
  );

  doc.roundedRect(
    x,
    y,
    width,
    125,
    7,
    7,
    "F"
  );

  addIconCircle(
    doc,
    x + 25,
    y + 25,
    title === "FLIGHTS"
      ? "F"
      : "P"
  );

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(15);

  doc.setTextColor(
    ...COLORS.dark
  );

  doc.text(
    title,
    x + 45,
    y + 30
  );

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.setFontSize(8);

  doc.setTextColor(
    ...COLORS.muted
  );

  doc.text(
    `Travellers: ${travellers || "-"}`,
    x + 18,
    y + 57
  );

  doc.text(
    `Per Adult: ${money(perAdult)}`,
    x + 18,
    y + 75
  );

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(18);

  doc.setTextColor(
    ...COLORS.orange
  );

  doc.text(
    money(total),
    x + width - 18,
    y + 74,
    {
      align: "right",
    }
  );

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.setFontSize(7);

  doc.setTextColor(
    ...COLORS.muted
  );

  doc.text(
    "TOTAL",
    x + width - 18,
    y + 55,
    {
      align: "right",
    }
  );
}

/*
|--------------------------------------------------------------------------
| POLICY PAGE
|--------------------------------------------------------------------------
*/

function createPolicyPage(
  doc,
  policy
) {
  doc.addPage();

  let y = addSectionTitle(
    doc,
    policy.title
  );

  policy.paragraphs.forEach(
    (paragraph) => {
      const height =
        estimateTextHeight(
          doc,
          paragraph,
          PAGE.width -
            MARGIN.left -
            MARGIN.right,
          9,
          4.9
        ) + 16;

      if (
        getRemainingHeight(y) <
        height
      ) {
        doc.addPage();

        const page =
          doc.internal.getNumberOfPages();

        addPageNumber(
          doc,
          page
        );

        y = addSectionTitle(
          doc,
          policy.title
        );
      }

      /*
       * Policy block
       */

      doc.setFillColor(
        250,
        250,
        250
      );

      const textHeight =
        estimateTextHeight(
          doc,
          paragraph,
          PAGE.width -
            MARGIN.left -
            MARGIN.right -
            24,
          9,
          4.9
        );

      doc.roundedRect(
        MARGIN.left,
        y - 10,
        PAGE.width -
          MARGIN.left -
          MARGIN.right,
        textHeight + 18,
        5,
        5,
        "F"
      );

      /*
       * Orange accent
       */

      doc.setFillColor(
        ...COLORS.orange
      );

      doc.roundedRect(
        MARGIN.left,
        y - 10,
        4,
        textHeight + 18,
        2,
        2,
        "F"
      );

      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.setFontSize(9);

      doc.setTextColor(
        ...COLORS.text
      );

      const lines =
        doc.splitTextToSize(
          paragraph,
          PAGE.width -
            MARGIN.left -
            MARGIN.right -
            24
        );

      doc.text(
        lines,
        MARGIN.left + 15,
        y + 2
      );

      y +=
        textHeight +
        18;
    }
  );
}

/*
|--------------------------------------------------------------------------
| FINAL PAGE
|--------------------------------------------------------------------------
*/

function createFinalPage(
  doc,
  logo,
  data
) {
  doc.addPage();

  /*
   * Orange hero
   */

  doc.setFillColor(
    ...COLORS.orange
  );

  doc.rect(
    0,
    0,
    PAGE.width,
    190,
    "F"
  );

  if (logo) {
    try {
      doc.addImage(
        logo,
        "PNG",
        PAGE.width / 2 - 75,
        42,
        150,
        40
      );
    } catch {}
  }

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(25);

  doc.setTextColor(
    ...COLORS.white
  );

  doc.text(
    "PrimeVistaJourney",
    PAGE.width / 2,
    115,
    {
      align: "center",
    }
  );

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.setFontSize(12);

  doc.text(
    "Travel Beyond Horizons",
    PAGE.width / 2,
    140,
    {
      align: "center",
    }
  );

  /*
   * Message
   */

  doc.setTextColor(
    ...COLORS.dark
  );

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(22);

  doc.text(
    "Discover the magic of travel",
    PAGE.width / 2,
    350,
    {
      align: "center",
    }
  );

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.setFontSize(13);

  doc.text(
    "and make every moment unforgettable.",
    PAGE.width / 2,
    378,
    {
      align: "center",
    }
  );

  /*
   * Contact card
   */

  doc.setFillColor(
    ...COLORS.orangeLight
  );

  doc.roundedRect(
    100,
    530,
    395,
    105,
    10,
    10,
    "F"
  );

  addIconCircle(
    doc,
    135,
    565,
    "C"
  );

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(11);

  doc.setTextColor(
    ...COLORS.dark
  );

  doc.text(
    "CONTACT US",
    160,
    562
  );

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.setFontSize(10);

  doc.text(
    "+91 81784 20122",
    160,
    585
  );

  doc.text(
    "info@primevistajourney.com",
    160,
    605
  );

  doc.setFontSize(8);

  doc.setTextColor(
    ...COLORS.muted
  );

  doc.text(
    "© PrimeVistaJourney. All rights reserved.",
    PAGE.width / 2,
    780,
    {
      align: "center",
    }
  );
}

/*
|--------------------------------------------------------------------------
| MAIN EXPORT
|--------------------------------------------------------------------------
*/

export async function downloadQuotationPdf(
  data
) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "a4",
    compress: true,
  });

  /*
   * Load user-selected images
   */

  let logo = null;
  let coverImage = null;

  try {
    if (
      data.logoFile
    ) {
      logo = await fileToDataUrl(
        data.logoFile
      );
    }
  } catch {}

  try {
    if (
      data.cover?.imageFile
    ) {
      coverImage =
        await fileToDataUrl(
          data.cover.imageFile
        );
    }
  } catch {}

  /*
   * Cover
   */

  createCoverPage(
    doc,
    data,
    logo,
    coverImage
  );

  /*
   * Stays
   */

  createStaysPage(
    doc,
    data
  );

  /*
   * Flights
   */

  createFlightsPage(
    doc,
    data
  );

  /*
   * Itinerary
   *
   * IMPORTANT:
   * Multiple days can now fit
   * on the same page.
   */

  createItineraryPages(
    doc,
    data
  );

  /*
   * Inclusions
   */

  createInclusionsPage(
    doc,
    data
  );

  /*
   * Fare
   */

  createFarePage(
    doc,
    data
  );

  /*
   * Fixed policies
   */

  createPolicyPage(
    doc,
    quotationPolicies.payment
  );

  createPolicyPage(
    doc,
    quotationPolicies.refund
  );

  createPolicyPage(
    doc,
    quotationPolicies.importantTerms
  );

  createPolicyPage(
    doc,
    quotationPolicies.cancellation
  );

  createPolicyPage(
    doc,
    quotationPolicies.airlineRefund
  );

  createPolicyPage(
    doc,
    quotationPolicies.liabilities
  );

  /*
   * Final branding
   */

  createFinalPage(
    doc,
    logo,
    data
  );

  /*
   * Fix every footer AFTER
   * the complete document exists.
   */

  const totalPages =
    doc.internal.getNumberOfPages();

  for (
    let page = 2;
    page <= totalPages;
    page++
  ) {
    doc.setPage(page);

    addPageNumber(
      doc,
      page
    );
  }

  /*
   * Download
   */

  const customer =
    data.customer?.name
      ?.trim()
      .replace(
        /[^a-zA-Z0-9-_ ]/g,
        ""
      )
      .replace(
        /\s+/g,
        "-"
      ) ||
    "Customer";

  doc.save(
    `${customer}-Quotation.pdf`
  );
}