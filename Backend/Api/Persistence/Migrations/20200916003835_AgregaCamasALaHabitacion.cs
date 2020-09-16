using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Persistence.Migrations
{
    public partial class AgregaCamasALaHabitacion : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "HabitacionId",
                table: "Camas",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Camas_HabitacionId",
                table: "Camas",
                column: "HabitacionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Camas_Habitaciones_HabitacionId",
                table: "Camas",
                column: "HabitacionId",
                principalTable: "Habitaciones",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Camas_Habitaciones_HabitacionId",
                table: "Camas");

            migrationBuilder.DropIndex(
                name: "IX_Camas_HabitacionId",
                table: "Camas");

            migrationBuilder.DropColumn(
                name: "HabitacionId",
                table: "Camas");
        }
    }
}
