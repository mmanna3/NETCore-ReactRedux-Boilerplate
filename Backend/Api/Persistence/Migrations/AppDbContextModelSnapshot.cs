﻿// <auto-generated />
using System;
using Api.Persistence.Config;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Api.Persistence.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Api.Core.Models.Cama", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("nvarchar(30)")
                        .HasMaxLength(30);

                    b.Property<int>("Tipo")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Camas");

                    b.HasDiscriminator<int>("Tipo");
                });

            modelBuilder.Entity("Api.Core.Models.CamaCucheta", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("AbajoId")
                        .HasColumnType("int");

                    b.Property<int?>("ArribaId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AbajoId");

                    b.HasIndex("ArribaId");

                    b.ToTable("CamasCuchetas");
                });

            modelBuilder.Entity("Api.Core.Models.Habitacion", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("nvarchar(30)")
                        .HasMaxLength(30);

                    b.HasKey("Id");

                    b.ToTable("Habitaciones");
                });

            modelBuilder.Entity("Api.Core.Models.Huesped", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("nvarchar(30)")
                        .HasMaxLength(30);

                    b.HasKey("Id");

                    b.ToTable("Huespedes");
                });

            modelBuilder.Entity("Api.Core.Models.Usuario", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Apellido")
                        .IsRequired()
                        .HasColumnType("nvarchar(30)")
                        .HasMaxLength(30);

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("nvarchar(30)")
                        .HasMaxLength(30);

                    b.Property<byte[]>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(30)")
                        .HasMaxLength(30);

                    b.HasKey("Id");

                    b.ToTable("Usuarios");
                });

            modelBuilder.Entity("Api.Core.Models.CamaCuchetaDeAbajo", b =>
                {
                    b.HasBaseType("Api.Core.Models.Cama");

                    b.HasDiscriminator().HasValue(3);
                });

            modelBuilder.Entity("Api.Core.Models.CamaCuchetaDeArriba", b =>
                {
                    b.HasBaseType("Api.Core.Models.Cama");

                    b.HasDiscriminator().HasValue(4);
                });

            modelBuilder.Entity("Api.Core.Models.CamaIndividual", b =>
                {
                    b.HasBaseType("Api.Core.Models.Cama");

                    b.HasDiscriminator().HasValue(1);
                });

            modelBuilder.Entity("Api.Core.Models.CamaMatrimonial", b =>
                {
                    b.HasBaseType("Api.Core.Models.Cama");

                    b.HasDiscriminator().HasValue(2);
                });

            modelBuilder.Entity("Api.Core.Models.CamaCucheta", b =>
                {
                    b.HasOne("Api.Core.Models.CamaCuchetaDeAbajo", "Abajo")
                        .WithMany()
                        .HasForeignKey("AbajoId");

                    b.HasOne("Api.Core.Models.CamaCuchetaDeArriba", "Arriba")
                        .WithMany()
                        .HasForeignKey("ArribaId");
                });
#pragma warning restore 612, 618
        }
    }
}
