using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Persistence.Migrations
{
    public partial class PoneHabitacionIdEnLasCamasQueCorresponde : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Camas_Habitaciones_HabitacionId",
                table: "Camas");

            migrationBuilder.RenameColumn(
                name: "HabitacionId",
                table: "Camas",
                newName: "Matrimonial_HabitacionId");

            migrationBuilder.RenameIndex(
                name: "IX_Camas_HabitacionId",
                table: "Camas",
                newName: "IX_Camas_Matrimonial_HabitacionId");

            migrationBuilder.AddColumn<int>(
                name: "HabitacionId",
                table: "CamasCuchetas",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "Matrimonial_HabitacionId",
                table: "Camas",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "Individual_HabitacionId",
                table: "Camas",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_CamasCuchetas_HabitacionId",
                table: "CamasCuchetas",
                column: "HabitacionId");

            migrationBuilder.CreateIndex(
                name: "IX_Camas_Individual_HabitacionId",
                table: "Camas",
                column: "Individual_HabitacionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Camas_Habitaciones_Individual_HabitacionId",
                table: "Camas",
                column: "Individual_HabitacionId",
                principalTable: "Habitaciones",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Camas_Habitaciones_Matrimonial_HabitacionId",
                table: "Camas",
                column: "Matrimonial_HabitacionId",
                principalTable: "Habitaciones",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CamasCuchetas_Habitaciones_HabitacionId",
                table: "CamasCuchetas",
                column: "HabitacionId",
                principalTable: "Habitaciones",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Camas_Habitaciones_Individual_HabitacionId",
                table: "Camas");

            migrationBuilder.DropForeignKey(
                name: "FK_Camas_Habitaciones_Matrimonial_HabitacionId",
                table: "Camas");

            migrationBuilder.DropForeignKey(
                name: "FK_CamasCuchetas_Habitaciones_HabitacionId",
                table: "CamasCuchetas");

            migrationBuilder.DropIndex(
                name: "IX_CamasCuchetas_HabitacionId",
                table: "CamasCuchetas");

            migrationBuilder.DropIndex(
                name: "IX_Camas_Individual_HabitacionId",
                table: "Camas");

            migrationBuilder.DropColumn(
                name: "HabitacionId",
                table: "CamasCuchetas");

            migrationBuilder.DropColumn(
                name: "Individual_HabitacionId",
                table: "Camas");

            migrationBuilder.RenameColumn(
                name: "Matrimonial_HabitacionId",
                table: "Camas",
                newName: "HabitacionId");

            migrationBuilder.RenameIndex(
                name: "IX_Camas_Matrimonial_HabitacionId",
                table: "Camas",
                newName: "IX_Camas_HabitacionId");

            migrationBuilder.AlterColumn<int>(
                name: "HabitacionId",
                table: "Camas",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Camas_Habitaciones_HabitacionId",
                table: "Camas",
                column: "HabitacionId",
                principalTable: "Habitaciones",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
