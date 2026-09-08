

// ============================================
// USER COLUMNS
// ============================================

export const userColumns = [
  {
    field: "username",
    headerName: "Username",
    width: 180,
  },

  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "country",
    headerName: "Country",
    width: 130,
  },

  {
    field: "city",
    headerName: "City",
    width: 130,
  },

  {
    field: "isAdmin",
    headerName: "Admin",
    width: 100,

    renderCell: (params) => {
      return (
        <span>
          {params.row.isAdmin ? "Yes" : "No"}
        </span>
      );
    },
  },

  {
    field: "createdAt",
    headerName: "Created At",
    width: 150,

    renderCell: (params) => {
      return (
        <span>
          {params.row.createdAt
            ? new Date(params.row.createdAt).toLocaleDateString()
            : "N/A"}
        </span>
      );
    },
  },
];


// ============================================
// HOTEL COLUMNS
// ============================================

export const hotelColumns = [
  {
    field: "name",
    headerName: "Hotel",
    width: 230,

    renderCell: (params) => {
      const photo =
        params.row.photos &&
        params.row.photos.length > 0
          ? params.row.photos[0]
          : null;

      return (
        <div className="cellWithImg">
          {photo ? (
            <img
              className="cellImg"
              src={photo}
              alt="hotel"
            />
          ) : (
            <div
              className="cellImg"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              No Image
            </div>
          )}

          {params.row.name}
        </div>
      );
    },
  },

  {
    field: "type",
    headerName: "Type",
    width: 120,
  },

  {
    field: "city",
    headerName: "City",
    width: 120,
  },

  {
    field: "address",
    headerName: "Address",
    width: 220,
  },

  {
    field: "distance",
    headerName: "Distance",
    width: 120,
  },

  {
    field: "title",
    headerName: "Title",
    width: 200,
  },

  {
    field: "desc",
    headerName: "Description",
    width: 280,
  },

  {
    field: "rating",
    headerName: "Rating",
    width: 100,

    renderCell: (params) => {
      return (
        <span>
          {params.row.rating !== undefined &&
          params.row.rating !== null
            ? params.row.rating
            : "N/A"}
        </span>
      );
    },
  },

  {
    field: "rooms",
    headerName: "Rooms",
    width: 100,

    renderCell: (params) => {
      return (
        <span>
          {params.row.rooms?.length || 0}
        </span>
      );
    },
  },

  {
    field: "cheapestPrice",
    headerName: "Starting Price",
    width: 150,

    renderCell: (params) => {
      return (
        <span>
          ₹ {params.row.cheapestPrice}
        </span>
      );
    },
  },

  {
    field: "featured",
    headerName: "Featured",
    width: 110,

    renderCell: (params) => {
      return (
        <span>
          {params.row.featured
            ? "Yes"
            : "No"}
        </span>
      );
    },
  },
];


// ============================================
// ROOM COLUMNS
// ============================================

export const roomColumns = [
  {
    field: "title",
    headerName: "Room Title",
    width: 180,
  },

  {
    field: "price",
    headerName: "Price",
    width: 120,

    renderCell: (params) => {
      return (
        <span>
          ₹ {params.row.price}
        </span>
      );
    },
  },

  {
    field: "maxPeople",
    headerName: "Max People",
    width: 130,
  },

  {
    field: "desc",
    headerName: "Description",
    width: 280,
  },

  {
    field: "roomNumbers",
    headerName: "Room Numbers",
    width: 200,

    renderCell: (params) => {
      const rooms = params.row.roomNumbers || [];

      if (rooms.length === 0) {
        return <span>No Rooms</span>;
      }

      return (
        <span>
          {rooms
            .map((room) => room.number)
            .join(", ")}
        </span>
      );
    },
  },

  {
    field: "totalRooms",
    headerName: "Total Rooms",
    width: 120,

    renderCell: (params) => {
      return (
        <span>
          {params.row.roomNumbers?.length || 0}
        </span>
      );
    },
  },

  {
    field: "unavailableDates",
    headerName: "Unavailable Dates",
    width: 180,

    renderCell: (params) => {
      const rooms =
        params.row.roomNumbers || [];

      const dates = rooms.flatMap(
        (room) =>
          room.unavailableDates || []
      );

      return (
        <span>
          {dates.length === 0
            ? "Available"
            : `${dates.length} Date(s)`}
        </span>
      );
    },
  },

  {
    field: "createdAt",
    headerName: "Created At",
    width: 150,

    renderCell: (params) => {
      return (
        <span>
          {params.row.createdAt
            ? new Date(
                params.row.createdAt
              ).toLocaleDateString()
            : "N/A"}
        </span>
      );
    },
  },
];


// ============================================
// BOOKING COLUMNS
// ============================================

export const bookingColumns = [
  {
    field: "_id",
    headerName: "Booking ID",
    width: 220,
  },

  {
    field: "user",
    headerName: "User",
    width: 140,

    renderCell: (params) => {
      return (
        <span>
          {params.row.user?.username || "N/A"}
        </span>
      );
    },
  },

  {
    field: "email",
    headerName: "Email",
    width: 220,

    renderCell: (params) => {
      return (
        <span>
          {params.row.user?.email || "N/A"}
        </span>
      );
    },
  },

  {
    field: "hotel",
    headerName: "Hotel",
    width: 180,

    renderCell: (params) => {
      return (
        <span>
          {params.row.hotel?.name || "N/A"}
        </span>
      );
    },
  },

  {
    field: "city",
    headerName: "City",
    width: 120,

    renderCell: (params) => {
      return (
        <span>
          {params.row.hotel?.city || "N/A"}
        </span>
      );
    },
  },

  {
    field: "rooms",
    headerName: "Rooms",
    width: 100,

    renderCell: (params) => {
      return (
        <span>
          {params.row.rooms?.length || 0}
        </span>
      );
    },
  },

  {
    field: "roomNumbers",
    headerName: "Room No.",
    width: 150,

    renderCell: (params) => {
      const rooms = params.row.rooms || [];

      return (
        <span>
          {rooms.length > 0
            ? rooms.map((room) => room.roomNumber).join(", ")
            : "N/A"}
        </span>
      );
    },
  },

  {
    field: "checkIn",
    headerName: "Check In",
    width: 140,

    renderCell: (params) => {
      return (
        <span>
          {params.row.checkIn
            ? new Date(params.row.checkIn).toLocaleDateString()
            : "N/A"}
        </span>
      );
    },
  },

  {
    field: "checkOut",
    headerName: "Check Out",
    width: 140,

    renderCell: (params) => {
      return (
        <span>
          {params.row.checkOut
            ? new Date(params.row.checkOut).toLocaleDateString()
            : "N/A"}
        </span>
      );
    },
  },

  {
    field: "totalPrice",
    headerName: "Total Price",
    width: 140,

    renderCell: (params) => {
      return (
        <span>
          ₹ {params.row.totalPrice || 0}
        </span>
      );
    },
  },

  {
    field: "status",
    headerName: "Status",
    width: 120,

    renderCell: (params) => {
      return (
        <span>
          {params.row.status || "Pending"}
        </span>
      );
    },
  },

  {
    field: "createdAt",
    headerName: "Booked At",
    width: 140,

    renderCell: (params) => {
      return (
        <span>
          {params.row.createdAt
            ? new Date(params.row.createdAt).toLocaleDateString()
            : "N/A"}
        </span>
      );
    },
  },
];