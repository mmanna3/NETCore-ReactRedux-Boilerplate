using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Persistence.Migrations
{
    public partial class masInformacionEnHabitaciones : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "EsPrivada",
                table: "Habitaciones",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "InformacionAdicional",
                table: "Habitaciones",
                maxLength: 140,
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "TieneBanio",
                table: "Habitaciones",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EsPrivada",
                table: "Habitaciones");

            migrationBuilder.DropColumn(
                name: "InformacionAdicional",
                table: "Habitaciones");

            migrationBuilder.DropColumn(
                name: "TieneBanio",
                table: "Habitaciones");
        }
    }
}
