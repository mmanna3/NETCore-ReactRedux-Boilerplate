using Microsoft.EntityFrameworkCore.Migrations;

namespace Api.Persistence.Migrations
{
    public partial class EliminaTodoLoRelativoALasCamas : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CamaIndividual");

            migrationBuilder.DropTable(
                name: "CamaMarinera");

            migrationBuilder.DropTable(
                name: "CamaMatrimonial");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CamaIndividual",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HabitacionId = table.Column<int>(type: "int", nullable: false),
                    Nombre = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CamaIndividual", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CamaIndividual_Habitacion_HabitacionId",
                        column: x => x.HabitacionId,
                        principalTable: "Habitacion",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CamaMarinera",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HabitacionId = table.Column<int>(type: "int", nullable: false),
                    NombreAbajo = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    NombreArriba = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CamaMarinera", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CamaMarinera_Habitacion_HabitacionId",
                        column: x => x.HabitacionId,
                        principalTable: "Habitacion",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CamaMatrimonial",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HabitacionId = table.Column<int>(type: "int", nullable: false),
                    Nombre = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CamaMatrimonial", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CamaMatrimonial_Habitacion_HabitacionId",
                        column: x => x.HabitacionId,
                        principalTable: "Habitacion",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CamaIndividual_HabitacionId",
                table: "CamaIndividual",
                column: "HabitacionId");

            migrationBuilder.CreateIndex(
                name: "IX_CamaMarinera_HabitacionId",
                table: "CamaMarinera",
                column: "HabitacionId");

            migrationBuilder.CreateIndex(
                name: "IX_CamaMatrimonial_HabitacionId",
                table: "CamaMatrimonial",
                column: "HabitacionId");
        }
    }
}
